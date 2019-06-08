var router = require('koa-router')();
const mysql = require('../mysql');

const io = require('../Controller/chat').io;
const sendUserMsg = require('../Controller/chat').sendUserMsg;


// 查询该账号

// 思路：
// 1、根据客户端发送的账号查找user表
// 2、判断账号是否存在
// 3、查询好友表判断是否已经是好友
// 4、返回信息

router.get('/getFriends', async ctx => {
    console.log("开始查询好友");
    const { query } = ctx.request;

    let d = null;
    // 查询账号是否存在
    await searchUserId(query.tel).then(data => {
        console.log("查询好友结果：");
        console.log(data);
        if (data.length == 0) {
            ctx.body = {
                status: -1,
                msg: "没有该账号"
            }
        } else {
            d = data[0];
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "查询失败"
        }
    })

    // 查询是否好友关系
    await searchFriends(d.id, ctx.session.userInfo.id).then(data => {
        console.log("查询是否好友关系")
        console.log(data);
        let obj = {
            status: 1,
            data: {
                isFriends: true,//是否好友关系
                status: 1,
                data: d,
            }
        }
        // status 0-不是好友关系 1-好友关系 2-等待对方同意 3-对方拒绝 4-黑名单
        if (data.length == 0 || data[0].status != 1) {
            // 不是好友关系
            obj.data.isFriends = false;
        }
        obj.data.status = data.length > 0 ? data[0].status : 0;
        ctx.body = obj;
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "查询失败"
        }
    })
})


// 查询好友关系
router.get('/getFriendsGourp', async ctx => {
    console.log("查询好友关系2")
    const { query } = ctx.request;
    const user = ctx.session.userInfo;

    let sql = `select * from user a,friends b where (b.aTel=a.tel and a.tel=${query.tel} and b.bTel=${user.tel}) or (b.bTel=a.tel  and a.tel=${query.tel} and b.aTel=${user.tel})`;


    let isNot = true;
    await mysql.query(sql).then(data => {
        console.log("查询好友关系2结果：")
        console.log(data);
        if (data.length > 0) {
            isNot = false;
            ctx.body = {
                status: 1,
                msg: "查询成功",
                data: {
                    data: data[0],
                    isNot: false,//好友或有过好友关系
                }
            }
        }

    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "查询失败"
        }
    })

    // 两者之间从未发生好友关系
    if (isNot) {
        // 查询账号是否存在
        console.log("查询账号是否存在")
        await searchUserId(query.tel).then(data => {
            console.log("查询账号是否存在")
            console.log(data);
            if (data.length == 0) {
                ctx.body = {
                    status: -1,
                    msg: "没有该账号"
                }
            } else {
                ctx.body = {
                    status: 1,
                    data: {
                        data: data[0],
                        isNot: true,
                    },
                    msg: "查找成功"
                }
            }
        }).catch(err => {
            ctx.body = {
                status: -1,
                msg: "查询失败"
            }
        })
    }

})



// 添加好友
router.post('/addFriends', async ctx => {
    console.log("添加好友")
    const { body } = ctx.request;
    console.log(body);
    let createTime = new Date().getTime();
    let aUser = ctx.session.userInfo;
    // status 0-不是好友关系 1-好友关系 2-等待对方同意 3-对方拒绝 4-黑名单
    let bUser = 0;
    // 查询是否好友关系
    await searchFriends(body.tel, aUser.tel).then(data => {
        if (data.length != 0 && data[0].isFriends != 0) {
            bUser = data[0];
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })

    // 不是好友添加
    if (bUser == 0) {
        await mysql.query('start transaction');
        try {
            let addFriendsData = await mysql.query(`INSERT INTO friends(aTel,bTel,status,createTime) VALUES(${aUser.tel},${body.tel}, 2,${createTime})`);
            if (addFriendsData.affectedRows == 1) {
                // 添加好友请求记录
                try {
					let sql=`INSERT INTO friend_record(fId,aTel,bTel,status,aIsRead,bIsRead,createTime,updateTime) VALUES(${addFriendsData.insertId},${aUser.tel},${body.tel}, 2,1,0,${createTime},${createTime})`;
                    let addfriendRecordData = await mysql.query(sql);
                    if (addfriendRecordData.affectedRows == 1) {
                        await mysql.query('commit');
                        const user = ctx.session.userInfo;
                        let hiTel = body.tel;
                        sendUserMsg(hiTel, 'onFriends', {
                            msg: user.nickName + "向您发起了好友申请"
                        })
                        // io.broadcast('onFriends' + hiTel, {
                        //     msg: user.nickName + "向您发起了好友申请"
                        // });
                        ctx.body = {
                            status: 1,
                            msg: "好友请求发送成功"
                        }
                    } else {
                        rollBack(ctx, '添加失败');
                    }
                } catch (err) {
                    rollBack(ctx, '添加失败');
                }
            } else {
                rollBack(ctx, '添加失败');
            }
        } catch (err) {
            rollBack(ctx, '添加失败');
        }
    } else if (bUser.status == 1) {
        ctx.body = {
            status: 1,
            msg: "Ta已经是您的好友了"
        }
    } else if (bUser.status == 2) {
        ctx.body = {
            status: 1,
            msg: "请等待对方验证"
        }
    } else if (bUser.status == 0 || bUser.status == 3) {
        // 如果是有记录，重新添加的时候重置两者关系 aTel为添加者 bTel为接受者
        await mysql.query('start transaction');
        try {
            let setFriends = await mysql.query(`update friends set status=2,aTel=${aUser.tel},bTel=${body.tel},updateTime=${createTime} where id=${bUser.id}`);

            if (setFriends.affectedRows == 1) {
                try {
					
					let sql=`INSERT INTO friend_record(fId,aTel,bTel,status,aIsRead,bIsRead,createTime,updateTime) VALUES(${bUser.id},${aUser.tel},${body.tel}, 2,1,0,${createTime},${createTime})`;
					
                    let addfriendRecordData = await mysql.query(sql);
                    if (addfriendRecordData.affectedRows == 1) {
                        await mysql.query('commit');
                        const user = ctx.session.userInfo;
                        let hiTel = body.tel;
                        console.log("通知此人：" + hiTel);
                        sendUserMsg(hiTel, 'onFriends', {
                            msg: user.nickName + "向您发起了好友申请"
                        })
                        // io.broadcast('onFriends' + hiTel, {
                        //     msg: user.nickName + "向您发起了好友申请"
                        // });
                        ctx.body = {
                            status: 1,
                            msg: "好友请求发送成功"
                        }
                    } else {
                        rollBack(ctx, '添加失败');
                    }
                } catch (err) {
                    rollBack(ctx, '添加失败');
                }
            } else {
                rollBack(ctx, '添加失败');
            }
        } catch (err) {
            rollBack(ctx, '添加失败');
        }

    } else if (bUser.status == 4) {
        ctx.body = {
            status: -1,
            msg: "对方已把您加入黑名单"
        }
    }
})

// 拒绝好友
router.post('/refuseFriends', async ctx => {
    const { body } = ctx.request;
    let updateTime = new Date().getTime();
    await mysql.query('start transaction');
    try {
        let data = await mysql.query(`update friends set status=3,updateTime=${updateTime} where id=${body.id}`);
        if (data.affectedRows == 1) {
            try {
                let upadtefriend_recordData = await mysql.query(`update friend_record set status=3,aIsRead=0,bIsRead=1,updateTime=${updateTime} where fId=${body.id} ORDER BY rId desc LIMIT 1`);
                if (upadtefriend_recordData.affectedRows == 1) {
                    await mysql.query('commit');
                    const user = ctx.session.userInfo;
                    let hiTel = body.tel;
                    sendUserMsg(hiTel, 'onFriends', {
                        type: 0,
                        msg: user.nickName + "拒绝了您的好友请求"
                    })
                    // io.broadcast('onFriends' + hiTel, {
                    //     type: 0,
                    //     msg: user.nickName + "拒绝了您的好友请求"
                    // });
                    ctx.body = {
                        status: 1,
                        msg: "已拒绝"
                    }
                } else {
                    rollBack(ctx, '操作失败,请重新尝试');
                }
            } catch (err) {
                rollBack(ctx, '操作失败,请重新尝试');
            }
        } else {
            rollBack(ctx, '操作失败,请重新尝试');
        }
    } catch (err) {
        rollBack(ctx, '操作失败,请重新尝试');
    }

})

// 获取好友申请列表
router.get('/getAddFriendsList', async ctx => {
    const { query } = ctx.request;
    const { userInfo } = ctx.session;
    // aTel是添加者
    // bTel是接受者
    // 如果b表的aTel是访问者的话，那么就关联bTel的user表数据返回
    let sql = `select b.fId as id,b.rId,b.aTel,b.bTel,a.tel,a.headImg,a.nickName,b.status from user a,friend_record b where (b.aTel=${userInfo.tel} and a.tel=b.bTel) or (b.bTel=${userInfo.tel}  and a.tel=b.aTel) ORDER BY rId desc limit ${(query.page - 1) * query.size},${query.size}`;
    await mysql.query(sql).then(data => {
        ctx.body = {
            status: 1,
            msg: "获取成功",
            data: data
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "获取好友申请列表失败"
        }
    })
})

// 获取好友申请通知
router.get('/getFriendsMsg', async ctx => {
    const { userInfo } = ctx.session;
    let sql = `select * from friend_record where (aTel=${userInfo.tel} and aIsRead=0) or (bTel=${userInfo.tel} and bIsRead=0)`;

    let data = await mysql.query(sql);
    ctx.body = {
        status: 1,
        msg: "获取成功",
        data: data
    }
})

// 设置所有好友申请消息为已读
router.post('/getFriendsAllMsgRead', async ctx => {
    const { userInfo } = ctx.session;
    let sql = `update friend_record set aIsRead=1 where (aTel=${userInfo.tel} and aIsRead=0);`;
    let sql2 = `update friend_record set bIsRead=1 where (bTel=${userInfo.tel} and bIsRead=0);`;
    let data = await mysql.query(sql);
    let data2 = await mysql.query(sql2);
    ctx.body = {
        status: 1,
        msg: "设置成功",
        data: {}
    }
})

// 同意好友申请
router.post('/agree', async ctx => {
    const { body } = ctx.request;
    let updateTime = new Date().getTime();
    await mysql.query('start transaction');
    try {
        let data = await mysql.query(`UPDATE friends SET status=1,updateTime=${updateTime} where id=${body.id}`);
        if (data.affectedRows == 1) {
            try {
                let jData = await mysql.query(`UPDATE friend_record SET status=1,aIsRead=0,bIsRead=1,updateTime=${updateTime} where fId=${body.id} order by rId desc limit 1`);
                if (jData.affectedRows == 1) {
                    mysql.query('commit');
                    const user = ctx.session.userInfo;
                    let hiTel = body.tel;
                    sendUserMsg(hiTel, 'onFriends', {
                        type: 1,
                        msg: user.nickName + "同意了您的好友申请"
                    })
                    // io.broadcast('onFriends' + hiTel, {
                    //     type: 1,
                    //     msg: user.nickName + "同意了您的好友申请"
                    // });
                    ctx.body = {
                        status: 1,
                        msg: "添加成功"
                    }
                } else {
                    rollBack(ctx, '操作失败');
                }
            } catch (err) {
                rollBack(ctx, '操作失败');
            }
        } else {
            rollBack(ctx, '操作失败');
        }
    } catch (err) {
        rollBack(ctx, '操作失败');
    }
})

// 删除好友
router.post('/deleteFriends', async ctx => {
    const { body } = ctx.request;
    const user = ctx.session.userInfo;
    let updateTime = new Date().getTime();
    await mysql.query(`UPDATE friends SET status=0,updateTime=${updateTime} where id=${body.id}`).then(data => {
        ctx.body = {
            status: 1,
            msg: "已删除该好友"
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "删除失败"
        }
    })
})

// 查询好友列表
router.get('/getFriendsList', async ctx => {
    const { query } = ctx.request;
    let user = ctx.session.userInfo;
    let sql = `select b.id,a.tel as userTel,a.tel,a.nickName,a.headImg from user a,friends b where b.status=1 and ((b.aTel=${user.tel} and a.tel=b.bTel) or (b.bTel=${user.tel} and a.tel=b.aTel)) limit ${(query.page - 1) * query.size},${query.size}`
    await mysql.query(sql).then(data => {
        ctx.body = {
            status: 1,
            data: data,
            msg: "查询成功"
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "查询失败"
        }
    })
})

// 查询该账号是否存在
function searchUserId(tel) {
    return new Promise((reslove, reject) => {
        mysql.query(`select * from user where tel=${tel}`).then((data) => {
            reslove(data);
        }).catch(err => {
            reject(err);
        })
    })
}

// 查询好友是否存在
function searchFriends(tel, uTel) {
    return new Promise((resolve, reject) => {
        mysql.query(`select * from Friends where (aTel=${tel} and bTel=${uTel}) or (aTel=${uTel} and bTel=${tel})`).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}


// 事务回滚-
function rollBack(ctx, msg) {
    mysql.query('rollback');
    ctx.body = {
        status: -1,
        msg: msg || "操作失败"
    }
}


module.exports = router;
