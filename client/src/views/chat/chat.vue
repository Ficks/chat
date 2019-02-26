<template>
    <div class="container_c">
        <mu-appbar style="width: 100%;" color="primary">
          <mu-button icon slot="left" @click="$router.back(-1)">
            <i class="iconfont icon-back"></i>
          </mu-button>
          Ficks
          <mu-button icon slot="right" @click="$router.back(-1)">
            <i class="iconfont icon-gengduo"></i>
          </mu-button>
        </mu-appbar>

        <div class="chatRecord">


          <div :class="{my:userInfo.tel==item.tel}" class="list" v-for="(item,index) in chatList">
            <div class="headImg" v-if="userInfo.tel==item.tel"><img src="@/assets/headImg.jpg" alt=""></div>
            <div class="headImg" v-else><img src="@/assets/logo.jpg" alt=""></div>
            <div class="mbox">
              <!-- <h3>Ficks</h3> -->
              <div class="text">{{item.msg}}</div>
            </div>
          </div>

          </div>
        

        <div class="chat_bom">
          <div class="chat_box">
            <div class="btns">
              <span class="iconfont icon-smile"></span>
            </div>
            <textarea v-model="chatVal" />
            <div class="btns w78" v-if="!chatVal">
              <span class="iconfont icon-smile"></span>
              <span class="iconfont icon-jiahao"></span>
            </div>
            <div class="send_btn" v-else @keyup.enter="sendMsg">
              <mu-button color="info" @click="sendMsg">发送</mu-button>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      socket: null,
      ta: {
        tel: 15111327689,
        headImg: "../../assets/logo.jpg"
      },
      chatVal: "",
      chatList: []
    };
  },
  methods: {
    // 发送消息
    sendMsg() {
      // 发送消息，这里可以用发送事件进行消息发送
      this.socket.emit("sendMsg", {
        toTel: this.ta.tel,
        tel: this.userInfo.tel,
        msg: this.chatVal,
        msgType: "text"
      });

      this.chatList.push({
        toTel: this.ta.tel,
        tel: this.userInfo.tel,
        msg: this.chatVal,
        msgType: "text"
      });
      this.chatVal = "";
    },
    // 接受消息
    getMsg() {
      // 接收消息
      this.socket.on("user" + this.userInfo.tel, data => {
        // 可以对数据进行渲染
        console.log(data);
        console.log(this.chatList);
        this.chatList.push(data);
      });
    },
    //聊天的时候别人发来的消息通知  目前先不用
    getAllMsg() {
      this.socket.on("allmessage", function(data) {
        // 接收所有人消息
        console.log("所以人的消息");
      });
    },
    // 初始化聊天记录
    chatInt() {
      if (this.userInfo.tel == 17620327669) {
        this.ta.tel = 15111327689;
        this.userInfo.headImg = "../../assets/logo.jpg";
      } else {
        this.ta.tel = 17620327669;
        this.userInfo.headImg = "../../assets/headImg.jpg";
      }
      // 建立连接
      this.socket = io("http://localhost:3000");
      // on表示接收
      // emit表示发送
      this.socket.on("connect", () => {
        console.log("连接上了");
        // 登录，同步前后端信息
        // 请求后端login接口，写入socketid
        this.socket.emit("login", {
          // 身份标识，可以是时间戳或者唯一id，最要用来回去socketid进行私聊
          id: this.userInfo.tel
        });
      });
    },
    // 表示服务器断开连接了
    chatOut() {
      // 表示连接断开了
      this.socket.on("disconnect", function() {
        console.log("聊天服务器断开了");
      });
    }
  },
  created() {
    this.chatInt();
    this.getMsg();
    this.chatOut();
  }
};
</script>
<style>
body {
  background: #eee;
}
</style>

<style lang="less" scoped>
.chatRecord {
  .list {
    display: flex;
    margin-top: 20px;
    .headImg {
      margin-right: 15px;
      margin-left: 15px;
      width: 50px;
      img {
        width: 100%;
        border-radius: 50%;
        box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.4);
      }
    }
    .mbox {
      // padding-top: 10px;
      max-width: 60%;

      .text {
        background: #fff;
        padding: 10px 15px;
        border-radius: 4px;
        margin-top: 15px;
      }
    }

    &.my {
      // 倒序
      flex-direction: row-reverse;
    }
  }
}
.icon-gengduo {
  font-size: 24px;
}
.chat_bom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .chat_box {
    height: 45px;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    background: #e1e1e1;

    textarea {
      height: 35px;
      border: 0;
      flex: 1;
      border-radius: 4px;
      padding: 10px;
      outline: none;
      box-sizing: border-box;
    }
    .send_btn {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      width: 78px;

      .mu-raised-button {
        min-width: auto;
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      box-sizing: border-box;
      .iconfont {
        margin: 0 5px;
        font-size: 24px;
      }
    }
  }
}
</style>

