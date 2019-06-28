<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.goBack">
        <i class="iconfont icon-back"></i>
      </mu-button>
      {{toUser.nickName}}
      <mu-button icon slot="right" @click="$router.goBack">
        <i class="iconfont icon-gengduo"></i>
      </mu-button>
    </mu-appbar>

    <div class="chatRecord" ref="scrollMain" id="scrollMain">
      <div class="box_chat" ref="scrollBox" id="scrollBox">
        <div class="more" v-show="loading">
          <i class="iconfont icon-jiazai"></i>加载更多
        </div>
        <div
          :class="{my:userInfo.tel==item.userTel}"
          class="list"
          v-for="(item,index) in chatList"
          :key="index"
        >
          <div class="headImg" v-if="userInfo.tel==item.userTel">
            <img :src="userInfo.sysPath+userInfo.headImg" alt>
          </div>
          <div class="headImg" v-else>
            <img :src="userInfo.sysPath+toUser.headImg" alt>
          </div>
          <div class="mbox">
            <!-- <h3>Ficks</h3> -->
            <div class="text">{{item.msg}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat_bom">
      <div class="chat_box">
        <div class="btns">
          <span class="iconfont icon-smile"></span>
        </div>
        <textarea ref="chatInput" v-model="chatVal" v-on:keyup.enter="sendMsg"/>
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
import { mapGetters, mapMutations } from "vuex";
import chatListApi from "@/api/chatList";
export default {
  computed: {
    ...mapGetters(["userInfo", "socket", "globalMsg", "goToBom"]),
    chatList() {
      console.log("触发触发");
      console.log(this.globalMsg[this.toUser.groupId]);
      if (this.globalMsg[this.toUser.groupId]) {
        return this.globalMsg[this.toUser.groupId].list || [];
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      isOne: true, //是否第一次请求历史记录
      moreAll: false, //是否已加载所有聊天信息
      judgeDeviceType: {},
      // socket: null,
      toUser: {
        tel: "",
        nickName: "",
        headImg: ""
      },
      chatVal: "",
      searchData: {
        page: 1,
        size: 20
      },
      // 下拉加载
      loading: false,
      scrollMain: null,
      scrollBox: null
    };
  },
  watch: {
    // 判断新的消息是否来自当前聊天，是的话滑动到底部
    goToBom() {
      console.log(this.goToBom.groupId);
      console.log(this.globalMsg[this.toUser.groupId].list);
      console.log(this.chatList);
      if (this.goToBom.groupId == this.toUser.groupId) {
        this.scrollBom();
      }
    }
  },
  methods: {
    ...mapMutations(["concatGlobalMsg", "addGlobalMsg", "setChatMsgRead"]),
    // 获取历史数据
    getHistory() {
      // 接收消息
      this.socket.on("chatHistory" + this.toUser.groupId, data => {
        this.searchData.page++;
        // 加载完所有聊天记录
        if (data.length < this.searchData.size) {
          this.moreAll = true;
        }
        this.loading = false;
        let scrollTop = this.scrollBox.clientHeight; //记录获取数据前的高度
        if (data.length > 0) {
          console.log(data);
          this.concatGlobalMsg({ list: data, groupId: this.toUser.groupId });
        }
        if (this.isOne) {
          this.scrollBom();
          setTimeout(() => {
            this.isOne = false;
          }, 200);
        } else {
          this.$nextTick(() => {
            this.scrollMain.scrollTop =
              this.scrollBox.clientHeight - (scrollTop + 50);
          });
        }
      });

      if (this.chatList.length == 0) {
        this.socket.emit("chatHistory", {
          userTel: this.userInfo.tel,
          toUserTel: this.toUser.tel,
          searchData: this.searchData,
          groupId: this.toUser.groupId
        });
      }
    },
    // 初次进入页面后滑动到最底部
    scrollBom() {
      this.$nextTick(() => {
        this.scrollMain.scrollTop = this.scrollBox.clientHeight;
      });
    },
    // 滚动条滚动的时候
    onScroll() {
      if (
        this.scrollMain.scrollTop <= 50 &&
        !this.loading &&
        (!this.isOne || this.chatList.length > 0) &&
        !this.moreAll
      ) {
        this.loading = true;

        setTimeout(() => {
          this.socket.emit("chatHistory", {
            userTel: this.userInfo.tel,
            toUserTel: this.toUser.tel,
            searchData: this.searchData,
            groupId: this.toUser.groupId
          });
          this.loading = false;
        }, 200);
      }
    },
    // 发送消息
    sendMsg() {
      // 发送消息，这里可以用发送事件进行消息发送
      let msgData = {
        groupId: this.toUser.groupId,
        msgInfo: {
          type: 1,
          toUserTel: this.toUser.tel,
          userTel: this.userInfo.tel,
          msg: this.chatVal,
          msgType: "1",
          createTime: new Date()
        },
        userInfo: {
          tel: this.userInfo.tel,
          headImg: this.userInfo.headImg,
          nickName: this.userInfo.nickName
        }
      };
      this.socket.emit("sendMsg", msgData);
      msgData.userInfo = {
        tel: this.toUser.tel,
        headImg: this.toUser.headImg,
        nickName: this.toUser.nickName
      };
      this.addGlobalMsg(msgData);
      this.chatVal = "";
      this.scrollBom();
      this.$refs.chatInput.style.height = "35px";
    },
    // 接受消息
    onMsg() {
      // 接收消息
      this.socket.on("chat", data => {
        // 可以对数据进行渲染
        // 如果在可视区域则滑动到新的消息哪里
        if (
          this.scrollMain.scrollTop + this.scrollMain.clientHeight >=
          this.scrollBox.clientHeight - 100
        ) {
          this.scrollBom();
        }
      });
    },
    // 初始化聊天记录
    chatInt() {
      this.toUser = this.$route.query;
      console.log("我的组:" + this.toUser.groupId);
      console.log(this.globalMsg);
      console.table(this.chatList);

      // 监听新的消息
      this.onMsg();

      // 获取历史聊天记录
      this.getHistory();

      // 设置当前聊天消息为已读
      this.setChatRead();
    },
    // 设置当前聊天为已读
    setChatRead() {
      this.socket.emit("setChatRead", {
        groupId: this.toUser.groupId,
        tel: this.toUser.tel
      });
      this.setChatMsgRead(this.toUser.groupId);
    },
    // 表示服务器断开连接了
    chatOut() {
      // 表示连接断开了
      this.socket.on("disconnect", function() {
        // console.log("聊天服务器断开了");
      });
    },
    // 监听输入框的软键盘弹起和收起事件
    listenKeybord($input) {
      if (this.judgeDeviceType.isIOS) {
        // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
        $input.addEventListener(
          "focus",
          function() {
            // console.log("IOS 键盘弹起啦！");
            // IOS 键盘弹起后操作
          },
          false
        );

        // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
        $input.addEventListener("blur", () => {
          // console.log("IOS 键盘收起啦！");
          // IOS 键盘收起后操作
          var wechatInfo = window.navigator.userAgent.match(
            /MicroMessenger\/([\d\.]+)/i
          );
          if (!wechatInfo) return;

          var wechatVersion = wechatInfo[1];
          var version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

          if (+wechatVersion.replace(/\./g, "") >= 674 && +version[1] >= 12) {
            window.scrollTo(
              0,
              Math.max(
                document.body.clientHeight,
                document.documentElement.clientHeight
              )
            );
          }
        });
      }

      // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
      if (this.judgeDeviceType.isAndroid) {
        var originHeight =
          document.documentElement.clientHeight || document.body.clientHeight;

        window.addEventListener(
          "resize",
          function() {
            var resizeHeight =
              document.documentElement.clientHeight ||
              document.body.clientHeight;
            if (originHeight < resizeHeight) {
              // console.log("Android 键盘收起啦！");
              // Android 键盘收起后操作
            } else {
              // console.log("Android 键盘弹起啦！");
              // Android 键盘弹起后操作
            }

            originHeight = resizeHeight;
          },
          false
        );
      }
    },
    // 获取手机系统型号
    getXt() {
      this.judgeDeviceType = (function() {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        var isIOS = /iphone|ipad|ipod/.test(ua);
        var isAndroid = /android/.test(ua);

        return {
          isIOS: isIOS,
          isAndroid: isAndroid
        };
      })();

      this.listenKeybord(this.$refs.chatInput);
      this.autoTextArea(this.$refs.chatInput);
    },
    autoTextArea(elem, extra, maxHeight) {
      extra = extra || 0;
      var isFirefox = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf("Opera"),
        addEvent = function(type, callback) {
          elem.addEventListener
            ? elem.addEventListener(type, callback, false)
            : elem.attachEvent("on" + type, callback);
        },
        getStyle = elem.currentStyle
          ? function(name) {
              var val = elem.currentStyle[name];

              if (name === "height" && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return (
                  rect.bottom -
                  rect.top -
                  parseFloat(getStyle("paddingTop")) -
                  parseFloat(getStyle("paddingBottom")) +
                  "px"
                );
              }

              return val;
            }
          : function(name) {
              return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle("height"));

      elem.style.resize = "none";

      var change = function() {
        var scrollTop,
          height,
          padding = 0,
          style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
          padding =
            parseInt(getStyle("paddingTop")) +
            parseInt(getStyle("paddingBottom"));
        }
        scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + "px";
        if (elem.scrollHeight > minHeight) {
          if (maxHeight && elem.scrollHeight > maxHeight) {
            height = maxHeight - padding;
            style.overflowY = "auto";
          } else {
            height = elem.scrollHeight - padding;
            style.overflowY = "hidden";
          }
          style.height = height + extra + "px";
          scrollTop += parseInt(style.height) - elem.currHeight;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          elem.currHeight = parseInt(style.height);
        }
      };

      addEvent("propertychange", change);
      addEvent("input", change);
      addEvent("focus", change);
      change();
    }
  },
  mounted() {
    this.scrollMain = document.getElementById("scrollMain");
    this.scrollBox = document.getElementById("scrollBox");
    this.chatInt();
    this.chatOut();
    this.getXt();
    this.scrollMain.addEventListener("scroll", this.onScroll, false);
    this.scrollBom();
  }
};
</script>
<style>
body {
  background: #eee;
}
</style>

<style lang="less" scoped>
.container {
  padding: 0;
  height: 100%;
}

.mu-load-more {
  overflow: hidden;
}
.container_c {
  // padding-top: 56px;
  padding-bottom: 45px !important;
  box-sizing: border-box;
  background: #eee;
  padding-bottom: 50px;
  overflow: hidden;
}

.more {
  text-align: center;
  color: #999;
  padding: 10px 0;
  i {
    animation: rotatemore 1s linear infinite;
    display: inline-block;
    color: #999;
  }
}

@keyframes rotatemore {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.chatRecord {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);

  .box_chat {
    padding-bottom: 20px;
  }
  .list {
    display: flex;
    padding-top: 20px;
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
    min-height: 45px;
    max-height: 90px;
    padding: 5px 0;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    background: #e1e1e1;

    textarea {
      min-height: 35px;
      height: 35px;
      max-height: 80px;
      border: 0;
      flex: 1;
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;
      overflow-y: auto !important;
      padding: 8px 6px;
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

