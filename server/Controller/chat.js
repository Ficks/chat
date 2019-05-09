const IO = require('koa-socket');
const io = new IO();
const socket = function (app) {
    // 聊天Start
    // 将socket和app关联
    io.attach(app)
    // 和客服端进行连接
    io.on('connection', (context) => {
        console.log('连接上了')
    })
    // 接收消息
    io.on('sendMsg', function (context) {
        // 向客服端实时发送消息
        console.log("用户发送的消息");
        console.log(context.data)

        // 在这里判别访问用户根据用户账号返回消息
        io.broadcast('user' + context.data.toTel, context.data)

        // 广播，所有人消息
        // io.broadcast('allmessage', context.data.newAccount)
    })

    // 处理登陆同步信息
    io.on('login', context => {
        let id = context.data.id;
    });
    // 聊天End

};


module.exports.socket = socket;
module.exports.io = io;