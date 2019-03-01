<template>
  <div class="container_c">
    <!-- 标题 -->
    <mu-appbar
      style="width: 100%;"
      color="primary"
    >
      <mu-button
        icon
        slot="left"
        @click="openDrawer=true"
      >
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      通讯录
      <mu-button
        icon
        slot="right"
        to="/addFriends"
      >
        <i class="iconfont icon-tianjia"></i>
      </mu-button>
    </mu-appbar>

    <!-- 搜索 -->
    <div class="search">
      <mu-select
        label="搜索好友"
        filterable
        v-model="filterable.value1"
        full-width
      >
        <mu-option
          avatar
          v-for="city,index in citys"
          :key="city"
          :label="city"
          :value="city"
        >
          <mu-list-item-action avatar>
            <mu-avatar
              :size="36"
              color="primary"
            >
              {{city.substring(0, 1)}}
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{city}}</mu-list-item-title>
          </mu-list-item-content>
        </mu-option>
      </mu-select>
    </div>

    <mu-paper
      :z-depth="1"
      class="demo-list-wrap"
    >
      <mu-list class="gongju">
        <mu-list-item
          to="/notice"
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <i class="iconfont icon-icon_addperson"></i>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>新的朋友</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <i class="iconfont icon-icon_meeting_fill"></i>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>群聊</mu-list-item-title>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <i class="iconfont icon-icon_link"></i>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>标签</mu-list-item-title>
        </mu-list-item>

      </mu-list>
      <mu-divider></mu-divider>
      <mu-list>
        <mu-sub-header>星标朋友</mu-sub-header>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Mike Li</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Maco Mai</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Alex Qin</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Allen Qun</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Myron Liu</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
      <mu-list>
        <mu-sub-header>History</mu-sub-header>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Gaia Zhou</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Miller Wang</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citys: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      filterable: {
        value1: "",
        value2: []
      }
    };
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 0 0.4rem /* 30/75 */;
}

.gongju {
  .iconfont {
    color: #fff;
    font-size: 24px;
  }

  .mu-avatar {
    background: #cc0;
  }

  li:nth-child(2) .mu-avatar {
    background: #b0f;
  }

  li:nth-child(3) .mu-avatar {
    background: #e0e;
  }
}
</style>
