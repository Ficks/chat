var router = require('koa-router')();
const mysql = require('../mysql');


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
    let sql = `select *,a.id as userId from user a,friends b where (b.aId=${query.id} and a.id=b.aId and b.bId=${user.id}) or (b.bId=${query.id}  and a.id=b.bId and b.aId=${user.id})`;
    if (query.tel) {
        sql = `select * from user a,friends b where (b.aId=a.id and a.tel=${query.tel} and b.bId=${user.id}) or (b.bId=a.id  and a.tel=${query.tel} and b.aId=${user.id})`;
    }
    await mysql.query(sql).then(data => {
        ctx.body = {
            status: 1,
            msg: "查询成功",
            data: data.length > 0 ? data[0] : []
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "查询失败"
        }
    })
})



// 添加好友
router.post('/addFriends', async ctx => {
    const { body } = ctx.request;

    let aUser = ctx.session.userInfo;
    // status 0-不是好友关系 1-好友关系 2-等待对方同意 3-对方拒绝 4-黑名单
    let bUser = 0;
    // 查询是否好友关系
    console.log("w d id：" + aUser.id)
    await searchFriends(body.id, aUser.id).then(data => {
        if (data.length != 0 && data[0].isFriends != 0) {
            bUser = data[0];
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })

    console.log(bUser)
    // 不是好友添加
    if (bUser == 0) {
        console.log("不是好友添加")
        await mysql.query(`INSERT INTO friends(aId,bId,status) VALUES(${aUser.id},${body.id}, 2)`).then(data => {
            ctx.body = {
                status: 1,
                msg: "好友请求发送成功"
            }
        }).catch(err => {
            ctx.body = {
                status: -1,
                msg: "添加失败"
            }
        })
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
        // 如果是有记录，重新添加的时候重置两者id关系 aid为添加者 bid为接受者
        await mysql.query(`update friends set status=2,aId=${aUser.id},bId=${body.id} where id=${bUser.id}`).then(data => {
            ctx.body = {
                status: 1,
                msg: "好友请求发送成功"
            }
        }).catch(err => {
            console.log(err)
            ctx.body = {
                status: -1,
                msg: "添加失败"
            }
        })

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
    await mysql.query(`update friends set status=3 where id=${body.id}`).then(data => {
        ctx.body = {
            status: 1,
            msg: "已拒绝"
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "请重新尝试此操作"
        }
    })
})

// 获取好友申请列表
router.get('/getAddFriendsList', async ctx => {
    const { query } = ctx.request;
    // aid是添加者
    // bid是接受者
    // 如果b表的aid是访问者的话，那么就关联bid的user表数据返回
    let sql = `select b.aId,b.bId,a.id as userId,a.headImg,a.nickName,b.status from user a,friends b where (b.aId=${query.id} and a.id=b.bId) or (b.bId=${query.id}  and a.id=b.aId) ORDER BY b.id desc limit ${(query.page - 1) * query.size},${query.size}`;
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
    await mysql.query(`UPDATE friends SET status=0 where (aId=${body.id} and bId=${user.id}) or aId=${user.id} and bId=${body.id}`).then(data => {
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
    let sql = `select b.id,a.id as userId,a.tel,a.nickName,a.headImg from user a,friends b where b.status=1 and ((b.aId=${user.id} and a.id=b.bId) or (b.bId=${user.id} and a.id=b.aId)) limit ${(query.page - 1) * query.size},${query.size}`
    console.log(sql);
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
function searchFriends(id, uid) {
    console.log('看看id');
    console.log(id);
    console.log(uid)
    return new Promise((resolve, reject) => {
        mysql.query(`select * from Friends where (aId=${id} and bId=${uid}) or (aId=${uid} and bId=${id})`).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}


module.exports = router;
