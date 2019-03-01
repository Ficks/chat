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
                data: d
            }
        }
        // status 0-不是好友关系 1-好友关系 2-等待对方同意 3-对方拒绝 4-黑名单
        if (data.length == 0 || data[0].status != 1) {
            // 不是好友关系
            obj.data.isFriends = false;
        }
        ctx.body = obj;
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
    await searchFriends(body.id, ctx.session.userInfo.id).then(data => {
        if (data.length != 0 && data[0].isFriends != 0) {
            bUser = data[0];
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })

    console.log(bUser);
    // 不是好友添加
    if (bUser.status == 0) {
        await mysql.query(`INSERT INTO friends(aId,bId,status) VALUES(${aUser.id},${body.id}, 2)`).then(data => {
            ctx.body = {
                status: 1,
                msg: "添加好友通知发送成功"
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
            msg: "请等待对方同意"
        }
    } else if (bUser.status == 3) {
        await mysql.query(`update friends set status=2 where id=${bUser.id}`).then(data => {
            ctx.body = {
                status: 1,
                msg: "添加好友通知发送成功"
            }
        }).catch(err => {
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

// 获取好友申请列表
router.get('/getAddFriendsList', async ctx => {
    const { query } = ctx.request;
    console.log(query)
    await mysql.query(`select * from user a,friends b where a.id=b.aid and b.bId=${query.id}`).then(data => {
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

// 查询该账号是否存在
function searchUserId(tel) {
    console.log(tel);
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
    return new Promise((resolve, reject) => {
        mysql.query(`select * from Friends where (aId=${id} and bId=${uid}) or (aId=${uid} and bId=${id})`).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = router;
