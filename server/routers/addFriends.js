var router = require('koa-router')();
const mysql = require('../mysql');


// 查询该账号

// 思路：
// 1、根据客户端发送的账号查找user表
// 2、判断账号是否存在
// 3、查询好友表判断是否已经是好友
// 4、返回信息


router.get('/getFriends', async ctx => {
    const { body } = ctx.request;

    let d = null;
    // 查询账号是否存在
    await searchUserId(body.id).then(data => {
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
    await searchFriends(body.id, ctx.session.userInfo.id).then(data => {
        let obj = {
            status: 1,
            data: {
                isFriends: false,//是否好友关系
                data: d
            }
        }
        if (data.length > 0) {
            obj.data.isFriends = true;
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
    let bUser = null;
    await searchUserId(body.id).then(data => {
        if (data.length > 0) {
            bUser = data[0];
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })

    let aUser = ctx.session.userInfo;

    await mysql.query(`INSERT INTO Friends(aId,bId,aName,bName,status) VALUES(${aUser.id},${bUser.id},${aUser.nickName},${bUser.nickName, 2})`).then(data => {
        ctx.body = {
            status: 1,
            msg: "好友通知发送成功"
        }
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "添加失败"
        }
    })
})

// 查询该账号是否存在
function searchUserId(id) {
    return new Promise((reslove, reject) => {
        mysql.query(`select * from user where id=${id}`).then((data) => {
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
