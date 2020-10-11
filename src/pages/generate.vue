<template>
    <div>
        <table cellspacing="0">
            <tr>
                <td>流水号</td>
                <td>{{resList.trace_no}}</td>
            </tr>
            <tr>
                <td>响应结果</td>
                <td>{{resList.ret_msg}}</td>
            </tr>
            <tr>
                <td>商户号</td>
                <td>{{resList.mchnt_cd}}</td>
            </tr>
            <tr>
                <td>商户名称</td>
                <td>{{resList.mchnt_name}}</td>
            </tr>
            <tr>
                <td>验证码失效时间</td>
                <td>{{resList.expire_ts}}</td>
            </tr>
            <tr>
                <td>验证码</td>
                <td>{{resList.verify_no}}</td>
            </tr>
            <tr>
                <td>协议编号</td>
                <td>
                  {{resList.contract_no}}</td>
            </tr>
            <tr>
                <td>协议签署服务地址</td>
                <td>
                  <a target="_blank" href="" :download="resList.sign_url">下载协议</a>
                </td>
            </tr>
            <tr>
              <td><el-button size="mini" type="primiry" @click="sign">确认签署协议</el-button></td>
              <td><el-button size="mini" type="primiry" @click="$router.go(-1)">返回</el-button></td>
            </tr>
            
            
        </table>
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      resList: {},
      ins_cd:'',
    };
  },
  created() {
    let data = this.$route.query.data;
    this.ins_cd = data.ins_cd;
    let _this = this;
    this.$axios.post(url.generate, data).then(function(res) {
      _this.resList = res.data;
      console.log(_this.resList)
    });
  },
  methods: {
    sign(){
      let _this = this;
      this.$axios.post(url.sign,{
        ins_cd:this.ins_cd,
        trace_no:this.resList.trace_no,
        mchnt_cd:this.resList.mchnt_cd,
        verify_no:this.resList.verify_no,
        contract_no:this.resList.contract_no,
      }).then(function(res){
        // console.log(res)
        if(res.data.ret_code=='0000'){
          _this.$message.success(
            res.data.ret_msg);
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.data =JSON.parse(to.query.data);
            console.log(vm.data)
        })
    },
};
</script>
<style scoped>
table {
  width:30%;
}
table tr {
  height: 30px;
}
table tr td {
  padding: 0 30px;
}
.el-button{
    margin-left: 40%;
    margin-top: 50px;
}
</style>
