import http from '../axios/axios';
export default {
    // 查询是否好友关系 --返回状态码
    getFriendsGourp(data) {
        return http({
            url: '/getFriendsGourp',
            type: 'get',
            data
        })
    },
    // 添加好友
    addFriends(data) {
        return http({
            url: '/addFriends',
            tips: true,
            data
        })
    },
    refuseFriends(data) {
        return http({
            url: '/refuseFriends',
            tips: true,
            data: data
        })
    },
    // 获取申请添加好友列表
    getAddFriendsList(data) {
        return http({
            url: '/getAddFriendsList',
            type: 'get',
            data
        })
    },
    // 同意对方添加好友请求
    agree(data) {
        return http({
            url: '/agree',
            data,
            tips: true
        })
    },
    // 删除好友
    deleteFriends(data) {
        return http({
            url: '/deleteFriends',
            data,
            tips: true
        })
    },
    // 查询好友列表
    getFriendsList(data) {
        return http({
            type: "get",
            url: '/getFriendsList',
            data,
        })
    }
}