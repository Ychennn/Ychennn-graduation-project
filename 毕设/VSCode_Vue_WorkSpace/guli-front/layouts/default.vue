<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="Origin">
            <img src="~/assets/img/logo.png" width="30%" height="30%" alt="Origin" />
          </a>
        </h1>

        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>影片</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>演员</a>
            </router-link>
            <!-- <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link> -->
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <!-- <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li> -->

            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/#" title>
                <img :src="loginInfo.avatar" width="30" height="30" class="vam picImg" alt />
                <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="搜索你想看的电影" name="queryCourse.courseName" value />
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="#" title="Origin" target="_blank">Origin</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：17390218297</span>
                <span>Email：848112638@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>所有视频版权均归Origin影院所有</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from "js-cookie";
import loginApi from "@/api/login";

export default {
  data() {
    return {
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
    };
  },
  created() {
    this.token = this.$route.query.token; //微信登录
    if (this.token) {
      this.wxLogin();
    }
     //展示用户信息
     this.showInfo();
  },
  methods: {
    wxLogin() {
      //把token存在cookie中、也可以放在localStorage中
      cookie.set("guli_token", this.token, { domain: "localhost" });
      cookie.set("guli_ucenter", "", { domain: "localhost" });
      //登录成功根据token获取用户信息
      loginApi.getLoginInfo().then((response) => {
        this.loginInfo = response.data.data.memberInfo;
        //将用户信息记录cookie
        cookie.set("guli_ucenter", this.loginInfo, { domain: "localhost" });
      });
    },

    //登录成功显示用户信息
    showInfo() {
      var userStr = cookie.get("guli_ucenter");
      if (userStr) {
        //把字符串转换转换成json对象
        this.loginInfo = JSON.parse(userStr);
      }
    },

    logout() {
      //情况cookie中的数据
      cookie.set("guli_ucenter", "", { domain: "localhost" });
      cookie.set("guli_token", "", { domain: "localhost" });

      //跳转页面
      window.location.href = "/";
    },
  },
};
</script>