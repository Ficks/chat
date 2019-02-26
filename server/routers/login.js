const router = require('koa-router')();
const mysql = require('../mysql');

const jwt = require('jsonwebtoken');

router.post('/login', async ctx => {
    console.log(ctx);
    const { body } = ctx.request;
    await mysql.query(`select * from user where tel=${body.tel} and pwd=${body.pwd}`).then(data => {
        if (data.length > 0) {
            let userInfo = data[0];
            delete userInfo.pwd;
            const token = jwt.sign({ tel: userInfo.tel, id: userInfo.id, nickName: userInfo.nickName }, 'conchat', { expiresIn: 60 * 60 * 1 }) //签发token
            ctx.body = {
                status: 1,
                msg: "登录成功",
                data: {
                    userInfo,
                    token
                },
            }
        } else {
            ctx.body = {
                status: -1,
                msg: "用户名或密码错误"
            }
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            status: -1,
            msg: "登录失败"
        }
    })
})

module.exports = router;