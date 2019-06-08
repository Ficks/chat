var router=require('koa-router')();
const mysql = require('../mysql');

// 获取好友聊天记录
router.get('/getChatList', async ctx => {
    const { userInfo } = ctx.session;
	const {query}=ctx.request;
	// select * from user a,friends b,chat_list c,messages d where ((a.tel=b.bTel and b.aTel=17620327669) or (a.tel=b.aTel and b.bTel=17620327669)) and c.fId=b.id and d.mId=(select max(mId) from messages) limit 0,15
    let sql = `select * from user a,friends b,chat_list c where ((a.tel=b.bTel and b.aTel=${userInfo.tel}) or (a.tel=b.aTel and b.bTel=${userInfo.tel})) and c.fId=b.id limit ${(query.page - 1) * query.size},${query.size}`
	console.log(sql);
	try{
		let data = await mysql.query(sql);
		ctx.body = {
		    status: 1,
		    msg: "获取聊天好友列表成功",
		    data: data
		}
	}catch(err){
		ctx.body = {
		    status: -1,
		    msg: "获取聊天好友列表失败",
		    data: err
		}
	}
    
})

router.post('/addChatList',async ctx=>{
	const { userInfo } = ctx.session;
	const {body}=ctx.request;
	let sql=`INSERT INTO chat_list(fId) VALUES(${body.fId})`;
	console.log(sql);
	try{
		let addData=await mysql.query(sql);
		if(addData.affectedRows==1){
			ctx.body={
				status:1,
				msg:'添加成功'
			}
		}else{
			ctx.body={
				status:-1,
				msg:'添加到聊天列表失败',
				data:err
			}
		}
	}catch(err){
		ctx.body={
			status:-1,
			msg:'添加到聊天列表失败',
			data:err
		}
	}
})


module.exports = router;