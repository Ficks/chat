<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      登录
    </mu-appbar>
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <mu-container class="form">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="手机号" prop="tel" :rules="telRules">
          <mu-text-field type="tel" v-model="validateForm.tel" prop="tel"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="pwd" :rules="pwdRules">
          <mu-text-field type="password" :type="showPwd?'text':'password'" v-model="validateForm.pwd" :action-icon="showPwd?'visibility_off':'visibility'" :action-click="()=>showPwd=!showPwd" prop="pwd"></mu-text-field>
        </mu-form-item>
        <div class="submit">
          <mu-button large full-width color="primary" @click="submit">登 录</mu-button>
        </div>
        <div class="center">
          <mu-button color="secondary" to="/register" flat>立即注册</mu-button>
          <mu-button flat to="/retrievePwd">忘记密码</mu-button>
        </div>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
import Config from '@/config/config';
import loginApi from '@/api/login';
export default {
  Name: '登录',
  data() {
    return {
      telRules: [
        {validate: val => !!val, message: '必须填写手机号'},
        {
          validate: val =>
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
              val
            ),
          message: '手机号格式不正确',
        },
      ],
      pwdRules: [
        {validate: val => !!val, message: '必须填写密码'},
        {
          validate: val => val.length >= 6 && val.length <= 16,
          message: '密码长度大于6小于16',
        },
      ],
      validateForm: {
        tel: '17620327669',
        pwd: '999999',
      },
      showPwd: false,
    };
  },
  methods: {
    ...mapActions(['onSocket']),
    ...mapMutations(['setToken', 'setUserInfo']),
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.loginSubmit();
        }
      });
    },
    loginSubmit() {
      loginApi.login(this.validateForm).then(data => {
        localStorage.tel = this.validateForm.tel;
        localStorage.pwd = this.validateForm.pwd;
        document.title = data.userInfo.nickName;
        data.userInfo.sysPath = Config.baseUrl;
        sessionStorage.userInfo = JSON.stringify(data.userInfo);
        sessionStorage.token = data.token;
        this.setToken(data.token);
        this.setUserInfo(data.userInfo);
        this.onSocket();
        this.$router.push('/');
      });
    },
  },
  created() {
    sessionStorage.token = sessionStorage.userInfo = '';
    this.validateForm.tel = localStorage.tel || '17620327669';
    this.validateForm.pwd = localStorage.pwd || '999999';
    this.setToken('');
    this.setUserInfo({});
  },
};
</script>
<style lang="less" scoped>
.form {
  padding: 15px;
}
h1 {
  text-align: center;
  font-size: 18px;
}
.logo {
  padding-top: 0.666667rem /* 50/75 */;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 50%;
  }
}
.mu-demo-form {
  width: 100%;
}
.center {
  padding-top: 10px;
  button {
    margin: 0 15px;
  }
}
.submit {
  width: 100%;
}
</style>
