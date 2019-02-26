import http from '../axios/axios';

export default {
    // 登录
    login(data) {
        return http({
            url: "/login",
            type: "post",
            data
        })
    }
}