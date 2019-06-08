import http from '../axios/axios';

export default{
	addChatList(data){
		return http({
			url:'/addChatList',
			type:'post',
			data
		})
	},
	getChatList(data){
		return http({
			url:'/getChatList',
			type:'get',
			data
		})
	}
}