const IO = require('koa-socket');
const io = new IO();
const mysql = require('../mysql');

// 所有用户列表
let userList = {};
// message表状态

// msgType 1-文字 2-表情 3-音频 4-视频
// status  0-发送失败 1发送成功 2-撤回该消息
const socket = function (app) {
    // 聊天Start
    // 将socket和app关联
    io.attach(app)
    // 和客服端进行连接
    io.on('connection', (context) => {
        console.log('连接上了')
    })
    // 接收消息
    io.on('sendMsg', async function (context) {
        let { data } = context;
        let createTime = new Date().getTime();
        // 向客服端实时发送消息
        console.log("用户发送的消息");
        console.log(data)

        try {
            let sql = `insert into messages(msg,msgType,userTel,toUserTel,status,createTime) values('${data.msg}',${data.msgType},${data.userTel},${data.toUserTel},1,${createTime})`
            let addData = await mysql.query(sql);
            if (addData.affectedRows == 1) {
                // 在这里判别访问用户根据用户账号返回消息
                sendUserMsg(data.toUserTel, 'chat', data);
                // io.broadcast('chat' + data.toUserTel, data);
            } else {
                // 如果消息存储失败 处理
                // io.broadcast('chat' + data.toUserTel, data);
            }
            // 广播，所有人消息
            // io.broadcast('allmessage', data.newAccount)
        } catch (err) {
            console.log("出错了");
            console.log(err);
        }
    })

    // 历史记录
    io.on('chatHistory', async context => {
        let { data } = context;
        let sql = `select * from messages where (userTel=${data.userTel} and toUserTel=${data.toUserTel}) or (userTel=${data.toUserTel} and toUserTel=${data.userTel}) ORDER BY mId desc limit ${(data.searchData.page - 1) * data.searchData.size},${data.searchData.size}`;
        let msgData = await mysql.query(sql);

        msgData.sort(function (a, b) {
            return a.mId - b.mId;
        })

        sendUserMsg(data.userTel, 'chatHistory', msgData);
        // io.broadcast('chatHistory' + data.userTel, msgData);
    })

    // 处理登陆同步信息
    io.on('login', context => {
        let id = context.data.id;
        userList[id] = context.socket;
        userList[id].user = id;
        console.log('连接了：' + id)
    });

    // 心跳包
    io.on("serverXinTiao", context => {
        setTimeout(() => {
            context.socket.emit("pcXinTiao", true);
        }, 5000)
    })

    io.on("disconnect", context => {
        console.log('断开连接');
        console.log(context);

        // 断开链接踢出列表;
        delete userList[context.user];
    })
    // 聊天End

};

function sendUserMsg(user, name, data) {
    if (userList[user]) {
        console.log("通知：" + user + "：" + name)
        userList[user].emit(name, data);
    } else {
        console.log("该用户不在线!");
    }
};

module.exports.socket = socket;
module.exports.io = io;
module.exports.sendUserMsg = sendUserMsg;