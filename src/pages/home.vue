<template>
  <div class="globel">
    <el-container>
      <el-header style="height:7%">
        <div class="logo">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="loginInfo">
          <span>{{username}}</span>
          <el-button @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!-- 侧边导航栏 -->
        <el-aside width="13%">
          <NavMenu></NavMenu>
        </el-aside>
        <el-container>
          <el-main>
           <router-view></router-view>
          </el-main>          
          <el-footer>版权信息</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
export default {
  data() {
    return {
      username:localStorage.getItem('username')

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    logout(){
      localStorage.clear('username');
      this.$router.push({ path: "/login"});
    }
  },
  components:{
    NavMenu
  }
};
</script>

<style>
.el-container {
height: 100%;
}
.globel{
  height: 100%;
}
/* 头部 */
.el-header,.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.logo {
  width: 13%;
  background-color: #444;
  color: white;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo img{
  height: 100%;
}
.loginInfo {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginInfo .el-button {
  margin-left: 20px;
}
/* 侧边 */
.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
}

/* 主页面 */
.el-container .el-main {
  background-color: #e9eef3;
  color: #333;
  height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

/* 底部 */
.el-footer {
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

