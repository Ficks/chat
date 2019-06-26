var router = require("koa-router")();
const mysql = require("../mysql");

// 获取临时好友聊天记录
router.get("/getChatList", async ctx => {
  const { userInfo } = ctx.session;
  const { query } = ctx.request;
  // 直接查找聊天记录表，取唯一的数据
  // let sql = `select max(a.mid) as mid,a.msg,a.msgType,a.userTel,a.toUserTel,a.status,b.tel,b.nickName,b.headImg from messages a,user b WHERE (a.userTel=${userInfo.tel} and b.tel=a.toUserTel) or (a.toUserTel=${userInfo.tel} and b.tel=a.userTel)  group by a.toUserTel order by a.mid desc`;
  let sql = `select * from temporary_chat_list a, messages b, user c WHERE a.msgId=b.mId and ((b.userTel=${userInfo.tel} and c.tel=b.toUserTel) or (b.toUserTel=${userInfo.tel} and c.tel=b.userTel))`;
  console.log(sql);
  // 以上的SQL查询都不太对，建议在新建一个好友聊天记录表，发送msg的时候记录msg的mid插入到新表关联查询，同时判断有无这条记录，没有新建，有覆盖
  try {
    let data = await mysql.query(sql);
    ctx.body = {
      status: 1,
      msg: "获取聊天好友列表成功",
      data: data
    };
  } catch (err) {
    ctx.body = {
      status: -1,
      msg: "获取聊天好友列表失败",
      data: err
    };
  }
});

router.post("/addChatList", async ctx => {
  const { userInfo } = ctx.session;
  const { body } = ctx.request;
  let sql = `INSERT INTO chat_list(fId) VALUES(${body.fId})`;
  console.log(sql);
  try {
    let addData = await mysql.query(sql);
    if (addData.affectedRows == 1) {
      ctx.body = {
        status: 1,
        msg: "添加成功"
      };
    } else {
      ctx.body = {
        status: -1,
        msg: "添加到聊天列表失败",
        data: err
      };
    }
  } catch (err) {
    ctx.body = {
      status: -1,
      msg: "添加到聊天列表失败",
      data: err
    };
  }
});

module.exports = router;
