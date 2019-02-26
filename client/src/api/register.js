import http from '../axios/axios';
export default {
    // 获取图片验证码
    getImgCode() {
        return http({
            url: '/getImgCode',
            type: 'get'
        })
    },
    // 获取短信验证码
    getSmsCode(smsCode) {
        return http({
            url: '/getSmsCode',
            type: 'get',
            data: { smsCode }
        })
    },
    // 注册
    submitRegister(data) {
        return http({
            url: '/register',
            type: 'post',
            tips: true,
            data
        })
    },
}