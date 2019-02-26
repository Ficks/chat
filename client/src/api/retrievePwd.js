import http from '../axios/axios';
export default {
    // 找回密码
    retrievePwd(data) {
        return http({
            url: '/retrievePwd',
            type: 'post',
            tips: true,
            data
        })
    },
}