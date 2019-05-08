var router = require('koa-router')();
const svgCaptcha = require('svg-captcha');
const mysql = require('../mysql');

// 获取图形验证码
router.get("/getImgCode", ctx => {
    const cap = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#888' // 验证码图片背景颜色
    });

    ctx.session.imgCode = cap.text.toLowerCase();
    ctx.body = {
        status: 1, data: { imgCode: cap.data }
    };
})



// 获取短信验证码
router.get('/getSmsCode', ctx => {
    if (ctx.request.query.smsCode.toLowerCase() == ctx.session.imgCode) {
        const code = createSmsCode();
        ctx.session.smsCode = code;
        ctx.body = { status: 1, data: { smsCode: code } };
    } else {
        ctx.body = {
            status: -1,
            msg: '图形验证码错误'
        }
    }
})


// 注册
router.post('/register', async ctx => {
    const { body } = ctx.request;
    let isReg = true;//是否可以注册
    if (body.smsCode != ctx.session.smsCode) {
        ctx.body = { status: -1, msg: "短信验证码错误" }
        return;
    }
    // 是否已注册
    await mysql.query(`select * from user where tel=${body.tel}`).then(data => {
        if (data.length == 0) {
            isReg = false;
        } else {
            ctx.body = { status: -1, msg: "该账号已注册" }
        }
    }).catch(err => {
        ctx.body = { status: -1, msg: "注册失败" }
    })
    if (isReg) return;
    let createTime = new Date().getTime();
    let addSql = `INSERT INTO user(tel,pwd,nickName,headImg,createTime) VALUES(${body.tel},${body.pwd},${body.tel},'/headImg/defaultHeadImg.jpg',${createTime})`;
    await mysql.query(addSql).then(data => {
        ctx.body = { status: 1, msg: "注册成功" }
    }).catch(err => {
        ctx.body = { status: -1, msg: "注册失败" }
    })
})


// 生成短信验证码
function createSmsCode() {
    var code = "";
    for (var i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

module.exports = router;
