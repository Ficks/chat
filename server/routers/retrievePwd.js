var router = require('koa-router')();
const mysql = require('../mysql');

// 注册
router.post('/retrievePwd', async ctx => {
    const { body } = ctx.request;

    // 验证码错误
    if (body.smsCode != ctx.session.smsCode) {
        ctx.body = {
            status: -1,
            msg: "验证码错误"
        }
        return;
    }
    let isBol = 0;
    await mysql.query(`select * from user where tel=${body.tel}`).then(rows => {
        isBol = rows.length;
    }).catch(err => {
        ctx.body = {
            status: -1,
            msg: "找回密码失败1"
        }
    })
    if (isBol) {
        await mysql.query(`update user set pwd=${body.pwd} where tel=${body.tel}`).then(data => {
            ctx.body = {
                status: 1,
                msg: "新密码设置成功"
            }
        }).catch(err => {
            ctx.body = {
                status: -1,
                msg: "找回密码失败2"
            }
        })
    } else {
        ctx.body = {
            status: -1,
            msg: "此账户没有注册"
        }
    }
})

module.exports = router;
