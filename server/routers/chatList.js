var router = require('koa-router')();
const mysql = require('../mysql');

// 获取临时好友聊天记录
router.get('/getChatList', async ctx => {
  const { userInfo } = ctx.session;
  const { query } = ctx.request;
  // 直接查找聊天记录表，取唯一的数据
  // 下面这条是查询关联的未读消息
  // let sql = `select a.type,a.groupId,b.msg,b.msgType,b.userTel,b.toUserTel,b.status,b.createTime,c.tel,c.nickName,c.headImg from temporary_chat_list a, messages b, user c WHERE a.msgId=b.mId and ((b.userTel=${userInfo.tel} and c.tel=b.toUserTel) or (b.toUserTel=${userInfo.tel} and c.tel=b.userTel)) ORDER BY b.createTime`;
  // 下面这条是上面的加强版加了子查询、查出了未读数目
  // let sql = `
  //     SELECT
  //     a.type,
  //     a.groupId,
  //     b.msg,
  //     b.msgType,
  //     b.userTel,
  //     b.toUserTel,
  //     b.status,
  //     b.createTime,
  //     c.tel,
  //     c.nickName,
  //     c.headImg,
  //     d.noReadTotal
  //   FROM
  //     temporary_chat_list a,
  //     messages b,
  //     USER c,
  //     ( SELECT m.groupId, COUNT( m.isRead ) AS noReadTotal FROM messages m,temporary_chat_list t WHERE m.groupId = t.groupId and toUserTel=${userInfo.tel} and m.isRead=0 GROUP BY m.groupId ) AS d 
  //   WHERE
  //     a.msgId=b.mId and ((b.userTel=${userInfo.tel} and c.tel=b.toUserTel) or (b.toUserTel=${userInfo.tel} and c.tel=b.userTel)) 
  //     ORDER BY b.createTime
  //     `

  let sql = `SELECT
      a.groupId,
      a.type,
      IFNULL( b.num, 0 ) noReadTotal,
      b.msg,
      b.msgType,
      b.userTel,
      b.toUserTel,
      b.status,
      b.createTime,
      c.tel,
      c.nickName,
      c.headImg
    FROM
      temporary_chat_list AS a
      LEFT JOIN ( SELECT groupId, count( isRead ) num FROM messages WHERE toUserTel = ${userInfo.tel} AND isRead = 0 GROUP BY groupId ) AS b ON a.groupId = b.groupId
      LEFT JOIN messages AS b ON a.msgId=b.mId
      LEFT JOIN user as c ON (( b.userTel = ${userInfo.tel} AND c.tel = b.toUserTel ) OR ( b.toUserTel = ${userInfo.tel} AND c.tel = b.userTel ) )
      WHERE b.userTel=${userInfo.tel} or b.toUserTel=${userInfo.tel} ORDER BY	b.createTime`
  console.log(sql);
  // 以上的SQL查询都不太对，建议在新建一个好友聊天记录表，发送msg的时候记录msg的mid插入到新表关联查询，同时判断有无这条记录，没有新建，有覆盖
  try {
    let data = await mysql.query(sql);
    ctx.body = {
      status: 1,
      msg: '获取聊天好友列表成功',
      data: data,
    };
  } catch (err) {
    ctx.body = {
      status: -1,
      msg: '获取聊天好友列表失败',
      data: err,
    };
  }
});

router.post('/addChatList', async ctx => {
  const { userInfo } = ctx.session;
  const { body } = ctx.request;
  let sql = `INSERT INTO chat_list(fId) VALUES(${body.fId})`;
  console.log(sql);
  try {
    let addData = await mysql.query(sql);
    if (addData.affectedRows == 1) {
      ctx.body = {
        status: 1,
        msg: '添加成功',
      };
    } else {
      ctx.body = {
        status: -1,
        msg: '添加到聊天列表失败',
        data: err,
      };
    }
  } catch (err) {
    ctx.body = {
      status: -1,
      msg: '添加到聊天列表失败',
      data: err,
    };
  }
});

module.exports = router;
