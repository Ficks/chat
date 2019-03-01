import http from '../axios/axios';
export default {
    // 查找好友
    getFriends(data) {
        return http({
            url: '/getFriends',
            type: 'get',
            tips: true,
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
    // 获取申请添加好友列表
    getAddFriendsList(data) {
        return http({
            url: '/getAddFriendsList',
            type: 'get',
            data
        })
    }
}