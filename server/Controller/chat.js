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
  io.attach(app);
  // 和客服端进行连接
  io.on('connection', context => {
    console.log('连接上了');
  });
  // 接收消息
  io.on('sendMsg', async function (context) {
    let { data } = context;
    // 向客服端实时发送消息
    console.log('用户发送的消息');
    console.log(data);

    try {
      let sql = `insert into messages(groupId,msg,msgType,userTel,toUserTel,status,createTime) values('${data.groupId}','${data.msgInfo.msg}',${data.msgInfo.msgType},${data.msgInfo.userTel},${data.msgInfo.toUserTel},1,now())`;
      console.log(sql);
      let addData = await mysql.query(sql);
      if (addData.affectedRows == 1) {
        // 在这里判别访问用户根据用户账号返回消息
        sendUserMsg(data.msgInfo.toUserTel, 'onMsg', data);
        // 添加到临时聊天列表
        let selectSql = `select * from temporary_chat_list WHERE groupId=${data.groupId}`;
        let selectRow = await mysql.query(selectSql);
        if (selectRow.length == 0) {
          let addTemSql = `insert into temporary_chat_list(type,groupId,msgId) VALUES(1,${data.groupId},${addData.insertId})`;
          mysql.query(addTemSql);
        } else {
          let updateSql = `update temporary_chat_list SET msgId=${addData.insertId} WHERE groupId=${data.groupId}`;
          mysql.query(updateSql);
        }
        // io.broadcast('chat' + data.toUserTel, data);
      } else {
        // 如果消息存储失败 处理
        // io.broadcast('chat' + data.toUserTel, data);
      }
      // 广播，所有人消息
      // io.broadcast('allmessage', data.newAccount)
    } catch (err) {
      console.log('出错了');
      console.log(err);
    }
  });

  // 设置聊天记录为已读
  io.on('setChatRead', async context => {
    let { data } = context;
    console.log(data);
    let sql = `update messages set isRead=1,updateTime=now() WHERE groupId=${data.groupId} and userTel=${data.tel}`;
    try {
      let data = await mysql.query(sql);
      console.log("设置聊天已读成功");
    } catch (error) {
      console.log("设置聊天已读失败");
      console.log(error);
    }
  })

  // 历史记录
  io.on('chatHistory', async context => {
    console.log('次数');
    let { data } = context;
    console.log(data.searchData);
    let sql = `select * from messages where groupId=${data.groupId} ORDER BY mId desc limit ${(data.searchData.page - 1) * data.searchData.size},${data.searchData.size}`;
    let msgData = await mysql.query(sql);

    msgData.sort(function (a, b) {
      return a.mId - b.mId;
    });
    sendUserMsg(data.userTel, 'chatHistory' + data.groupId, msgData);
    // io.broadcast('chatHistory' + data.userTel, msgData);
  });

  // 处理登陆同步信息
  io.on('login', context => {
    let id = context.data.id;
    userList[id] = context.socket;
    userList[id].user = id;
    console.log('连接了：' + id);
  });

  // 心跳包
  io.on('serverXinTiao', context => {
    setTimeout(() => {
      context.socket.emit('pcXinTiao', true);
    }, 5000);
  });

  io.on('disconnect', context => {
    console.log('断开连接');
    console.log(context);

    // 断开链接踢出列表;
    delete userList[context.user];
  });
  // 聊天End
};

// 推送消息给用户user为tel用户、name为监听的方法、data是数据
function sendUserMsg(user, name, data) {
  if (userList[user]) {
    console.log('通知：' + user + '：' + name);
    userList[user].emit(name, data);
  } else {
    console.log('该用户不在线!');
  }
}

module.exports.socket = socket;
module.exports.io = io;
module.exports.sendUserMsg = sendUserMsg;
