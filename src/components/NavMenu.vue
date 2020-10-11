<template>
    <div>
        <el-menu
            :default-active="this.$route.path"
            :router="true"
            class="el-menu-vertical-demo"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>商户信息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/merchantList">收单商户入网申请</el-menu-item>
                <el-menu-item index="/wxDispose">微信公众号参数配置</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
</style>

