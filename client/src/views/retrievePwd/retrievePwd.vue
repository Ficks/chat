<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="secondary">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <i class="iconfont icon-back"></i>
      </mu-button>
        找回密码
      </mu-appbar>
    <mu-container class="form">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="手机号" prop="tel" :rules="telRules">
          <mu-text-field v-model="validateForm.tel" prop="tel"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="图形验证码" prop="imgCode" :rules="imgCodeRules" class="imgcode">
          <mu-text-field v-model="validateForm.imgCode" prop="imgCode"></mu-text-field>
          <mu-button flat class="imgcode_btn" v-html="imgCode"  @click="getImgCode"></mu-button>
        </mu-form-item>

        <mu-form-item label="短信验证码" prop="smsCode" :rules="smsCodeRules" class="imgcode">
          <mu-text-field v-model="validateForm.smsCode" prop="smsCode"></mu-text-field>
          <mu-button color="secondary" @click="getSmsCode" class="">{{smsCodeData.text}}</mu-button>
        </mu-form-item>

        <mu-form-item label="密码" prop="pwd" :rules="pwdRules">
            <mu-text-field type="password" :type="showPwd?'text':'password'" v-model="validateForm.pwd" :action-icon="showPwd?'visibility_off':'visibility'" :action-click="()=>showPwd=!showPwd" prop="pwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="确认密码" prop="qrPwd" :rules="qrPwdRules">
            <mu-text-field type="password" :type="showQrPwd?'text':'password'" v-model="validateForm.qrPwd" :action-icon="showQrPwd?'visibility_off':'visibility'" :action-click="()=>showQrPwd=!showQrPwd" prop="qrPwd"></mu-text-field>
        </mu-form-item>
        <div class="submit">
          <mu-button large full-width  color="secondary" @click="submit">找回密码</mu-button>
        </div>
        <div class="center">
          <mu-button flat to="/login">去登录</mu-button>
        </div>
      </mu-form>
    </mu-container>


  </div>
</template>

<script>
import registerApi from "@/api/register";
import retrievePwdApi from "@/api/retrievePwd";
export default {
  Name: "找回密码",
  data() {
    return {
      telRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        {
          validate: val =>
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
              val
            ),
          message: "手机号格式不正确"
        }
      ],
      imgCodeRules: [{ validate: val => !!val, message: "必须填写图形验证码" }],
      smsCodeRules: [{ validate: val => !!val, message: "必须填写短信验证码" }],
      pwdRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6 && val.length <= 16,
          message: "密码长度大于6小于16"
        }
      ],
      qrPwdRules: [
        { validate: val => !!val, message: "请确认密码" },
        {
          validate: (val, form) => val == form.pwd,
          message: "密码不一致"
        }
      ],
      validateForm: {
        tel: "17620328888",
        pwd: "123456",
        qrPwd: "123456",
        imgCode: "",
        smsCode: ""
      },
      showPwd: false,
      showQrPwd: false,
      imgCode: "",
      smsCodeData: {
        text: "获取验证码",
        time: 60,
        timer: null
      }
    };
  },
  methods: {
    // 获取图形验证码
    getImgCode() {
      registerApi.getImgCode().then(data => {
        this.imgCode = data.imgCode;
      });
    },
    // 获取短信验证码
    getSmsCode() {
      if (!this.validateForm.imgCode) return;
      registerApi.getSmsCode(this.validateForm.imgCode).then(
        data => {
          this.$toast.success("您的短信验证码是" + data.smsCode);
          this.smsCodeData.timer = setInterval(() => {
            if (this.smsCodeData.time > 1) {
              this.smsCodeData.time--;
              this.smsCodeData.text = this.smsCodeData.time + "s";
            } else {
              this.smsCodeData.time = 60;
              this.smsCodeData.text = "获取验证码";
              clearInterval(this.smsCodeData.timer);
            }
          }, 1000);
        },
        err => {
          this.getImgCode();
          this.validateForm.imgCode = "";
        }
      );
    },
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) this.retrievePwdSubmit();
      });
    },
    retrievePwdSubmit() {
      retrievePwdApi.retrievePwd(this.validateForm).then(
        data => {
          this.$router.push("/login");
        },
        err => {}
      );
    }
  },
  created() {
    this.getImgCode();
  }
};
</script>
<style lang="less" scoped>
.form {
  padding: 15px;
}
.center {
  margin-top: 10px;
}
.imgcode {
  .mu-input {
    flex: 1;
  }
  .imgcode_btn {
    width: 88px;

    img {
      width: 100%;
    }
  }
}
</style>
<style>
.imgcode_btn .mu-button-wrapper {
  padding: 0;
}
</style>

