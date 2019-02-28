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
    addFriends(data) {
        return http({
            url: '/addFriends',
            tips: true,
            data
        })
    },
}