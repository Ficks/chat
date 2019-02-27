import http from '../axios/axios';
export default {
    // 查找好友
    getFriends(data) {
        return http({
            url: '/getFriends',
            type: 'post',
            tips: true,
            data
        })
    },
}