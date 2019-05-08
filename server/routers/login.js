const router = require('koa-router')();
const mysql = require('../mysql');

const jwt = require('jsonwebtoken');

router.post('/login', async ctx => {
    const { body } = ctx.request;
    let data = await mysql.query(`select * from user where tel=${body.tel} and pwd=${body.pwd}`);

    // 如果没有该账号
    if (data.length > 0) {
        let lastLoginTime = new Date().getTime();
        let updateData = await mysql.query(`update user set lastLoginTime=${lastLoginTime} where id=${data[0].id}`)
        let userInfo = data[0];
        delete userInfo.pwd;
        const token = jwt.sign({ tel: userInfo.tel, id: userInfo.id, nickName: userInfo.nickName }, 'conchat', { expiresIn: 60 * 60 * 1 }) //签发token
        ctx.session.userInfo = userInfo;
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
})

module.exports = router;