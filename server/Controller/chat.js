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



    // 好友添加等操作
    // io.on('onFriends', context => {
    //     const { data } = context;
    //     // type 0-拒绝  1-同意 2-删除 3-加入黑名单
    //     console.log("拒绝好友添加")
    //     let id = data.aId == data.userId ? data.aId : data.bId;
    //     console.log("onFriends" + id);
    //     io.broadcast("onFriends" + id, {
    //         msg: data.nickName + onFriendStatus(data.isType),
    //         type: data.isType
    //     });
    // })

    function onFriendStatus(type) {
        switch (type) {
            case 0:
                return "拒绝了您的好友申请"
                break;
            case 1:
                return "同意了您的好友申请"
                break;
            case 2:
                return "删除了您"
                break;
            case 3: "把您加入了黑名单"
                break;
            default:
                return "好友不知道把您咋的了"
                break;
        }
    }
};


module.exports.socket = socket;
module.exports.io = io;