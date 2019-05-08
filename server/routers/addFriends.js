var router = require('koa-router')();
const mysql = require('../mysql');

const io = require('../Controller/chat').io;




// 查询该账号

// 思路：
// 1、根据客户端发送的账号查找user表
// 2、判断账号是否存在
// 3、查询好友表判断是否已经是好友
// 4、返回信息

router.get('/getFriends', async ctx => {
    const { query } = ctx.request;

    let d = null;
    // 查询账号是否存在
    await searchUserId(query.tel).then(data => {
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
    const { query } = ctx.request;
    const user = ctx.session.userInfo;

    let sql = `select * from user a,friends b where (b.aTel=a.tel and a.tel=${query.tel} and b.bTel=${user.tel}) or (b.bTel=a.tel  and a.tel=${query.tel} and b.aTel=${user.tel})`;


    let isNot = true;
    await mysql.query(sql).then(data => {
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
        await searchUserId(query.tel).then(data => {
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
    const { body } = ctx.request;

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
        let g = await mysql.query('start transaction');
        let addFriendsData = await mysql.query(`INSERT INTO friends(aTel,bTel,status) VALUES(${aUser.tel},${body.tel}, 2)`);
        if (addFriendsData.affectedRows == 1) {
            // 添加好友请求记录
            let addFriendRecordData = await mysql.query(`INSERT INTO friendRecord(fId,aTel,bTel,status) VALUES(${addFriendsData.insertId},${aUser.tel},${body.tel}, 2)`)

            if (addFriendRecordData.affectedRows == 1) {
                await mysql.query('commit');
                const user = ctx.session.userInfo;
                let hiTel = body.tel;
                io.broadcast('onFriends' + hiTel, {
                    msg: user.nickName + "向您发起了好友申请"
                });
                ctx.body = {
                    status: 1,
                    msg: "好友请求发送成功"
                }
            } else {
                rollBack(ctx, '添加失败');
            }

        } else {
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
        let setFriends = await mysql.query(`update friends set status=2,aTel=${aUser.tel},bTel=${body.tel} where id=${bUser.id}`);
        if (setFriends.affectedRows == 1) {
            let addFriendRecordData = await mysql.query(`INSERT INTO friendRecord(fId,aTel,bTel,status) VALUES(${bUser.id},${aUser.tel},${body.tel}, 2)`)

            if (addFriendRecordData.affectedRows == 1) {
                await mysql.query('commit');
                const user = ctx.session.userInfo;
                let hiTel = body.tel;
                io.broadcast('onFriends' + hiTel, {
                    msg: user.nickName + "向您发起了好友申请"
                });
                ctx.body = {
                    status: 1,
                    msg: "好友请求发送成功"
                }
            } else {
                rollBack(ctx, '添加失败');
            }
        } else {
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
    await mysql.query('start transaction');
    let data = await mysql.query(`update friends set status=3 where id=${body.id}`);
    console.log(body.id);
    if (data.affectedRows == 1) {
        let upadteFriendRecordData = await mysql.query(`update friendRecord set status=3 where fId=${body.id} ORDER BY rId desc LIMIT 1`);
        console.log(`update friendRecord set status=3 where fId=${body.id} ORDER BY rId desc LIMIT 1`)
        console.log("删除记录")
        console.log(upadteFriendRecordData);
        if (upadteFriendRecordData.affectedRows == 1) {
            const user = ctx.session.userInfo;
            let hiTel = body.tel;
            io.broadcast('onFriends' + hiTel, {
                type: 0,
                msg: user.nickName + "拒绝了您的好友请求"
            });
            ctx.body = {
                status: 1,
                msg: "已拒绝"
            }
        } else {
            rollBack(ctx, '操作失败,请重新尝试');
        }
    } else {
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
    let sql = `select b.id,b.aTel,b.bTel,a.tel as userTel,a.headImg,a.nickName,b.status from user a,friends b where (b.aTel=${userInfo.tel} and a.tel=b.bTel) or (b.bTel=${userInfo.tel}  and a.tel=b.aTel) ORDER BY b.id desc limit ${(query.page - 1) * query.size},${query.size}`;
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

// 同意好友申请
router.post('/agree', async ctx => {
    const { body } = ctx.request;
    await mysql.query(`UPDATE friends SET status=1 where id=${body.id}`).then(data => {
        const user = ctx.session.userInfo;
        let hiTel = body.tel;
        io.broadcast('onFriends' + hiTel, {
            type: 1,
            msg: user.nickName + "同意了您的好友申请"
        });
        ctx.body = {
            status: 1,
            msg: "添加成功"
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })
})

// 删除好友
router.post('/deleteFriends', async ctx => {
    const { body } = ctx.request;
    const user = ctx.session.userInfo;
    await mysql.query(`UPDATE friends SET status=0 where id=${body.id}`).then(data => {
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
