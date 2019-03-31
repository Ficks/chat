<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="secondary">
      <mu-button icon slot="left" @click="$router.goBack">
        <i class="iconfont icon-back"></i>
      </mu-button>
      注册
    </mu-appbar>
    <mu-container class="form">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item label="手机号" prop="tel" :rules="telRules">
          <mu-text-field v-model="validateForm.tel" prop="tel"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="图形验证码" prop="imgCode" :rules="imgCodeRules" class="imgcode">
          <mu-text-field v-model="validateForm.imgCode" prop="imgCode"></mu-text-field>
          <mu-button flat class="imgcode_btn" v-html="imgCode" @click="getImgCode">

          </mu-button>
        </mu-form-item>

        <mu-form-item label="短信验证码" prop="smsCode" :rules="smsCodeRules" class="imgcode">
          <mu-text-field v-model="validateForm.smsCode" prop="smsCode"></mu-text-field>
          <mu-button color="secondary" @click="getSmsCode">{{smsCodeData.text}}</mu-button>
        </mu-form-item>

        <mu-form-item label="密码" prop="pwd" :rules="pwdRules">
          <mu-text-field type="password" :type="showPwd?'text':'password'" v-model="validateForm.pwd" :action-icon="showPwd?'visibility_off':'visibility'" :action-click="()=>showPwd=!showPwd" prop="pwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="确认密码" prop="qrPwd" :rules="qrPwdRules">
          <mu-text-field type="password" :type="showQrPwd?'text':'password'" v-model="validateForm.qrPwd" :action-icon="showQrPwd?'visibility_off':'visibility'" :action-click="()=>showQrPwd=!showQrPwd" prop="qrPwd"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" @click="openFullscreen=true" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <div class="submit">
          <mu-button large full-width color="secondary" :disabled="isReg" @click="submit">注 册</mu-button>
        </div>
        <div class="center">
          <mu-button flat to="/login">去登录</mu-button>
        </div>
      </mu-form>
    </mu-container>

    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-appbar color="primary" title="用户协议">
        <mu-button slot="left" icon @click="onCloseOpen">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 24px;">
        this is a fullscreen dialog
      </div>
      <div class="center">
        <mu-button color="primary" @click="openFullscreen=false">同意用户协议</mu-button>
        <mu-button @click="onCloseOpen">取消</mu-button>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import registerApi from "@/api/register";
export default {
  Name: "a",
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
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        tel: "",
        pwd: "",
        qrPwd: "",
        imgCode: "",
        smsCode: "",
        isAgree: false
      },
      showPwd: false, //显示密码
      showQrPwd: false, //显示确认密码
      openFullscreen: false, //显示用户协议
      imgCode: "", //图片验证码
      isReg: false, //是否可以注册 false可以 true不行
      smsCodeData: {
        text: "获取验证码",
        time: 60,
        timer: null
      }
    };
  },
  methods: {
    // 取消用户协议
    onCloseOpen() {
      this.validateForm.isAgree = false;
      this.openFullscreen = false;
    },
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
    // 注册
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.submitRegister();
        }
      });
    },
    submitRegister() {
      this.isReg = true;
      registerApi.submitRegister(this.validateForm).then(
        data => {
          this.isReg = false;
          this.$router.push("/login");
        },
        err => {
          this.isReg = false;
        }
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

  button {
    margin: 0 15px;
  }
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

