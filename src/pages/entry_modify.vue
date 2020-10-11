<template>
    <div>
        <div class="form_info">
            <div style="margin: 20px;"></div>
            <el-form
                label-position="right"
                :model="form"
                label-width="180px"
                ref="form"
                size="mini"
                :inline-message="true"
            >
                <!-- <el-form-item label="机构号" prop="ins_cd">
                    <el-input v-model="form.ins_cd"></el-input>
                </el-form-item>-->
                <el-form-item label="流水号" prop="trace_no">
                    <el-input v-model="form.trace_no" disabled></el-input>
                </el-form-item>
                <el-form-item label="商户号" prop="fy_mchnt_cd">
                    <el-input v-model="form.fy_mchnt_cd" disabled></el-input>
                </el-form-item>
                <el-form-item label="商户名称" prop="mchnt_name">
                    <el-input v-model="form.mchnt_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="入账卡类型" prop="acnt_type">
                    <el-select v-model="form.acnt_type" clearable>
                        <el-option label="对公" value="1"></el-option>
                        <el-option label="对私" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人入账表示" prop="acnt_artif_flag">
                    <el-select v-model="form.acnt_artif_flag" clearable>
                        <el-option label="非法人入账" value="0"></el-option>
                        <el-option label="法人入账" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入账证件类型" prop="acnt_certif_tp">
                    <el-select v-model="form.acnt_certif_tp" clearable>
                        <el-option label="身份证" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入账证件号" prop="acnt_certif_id">
                    <el-input v-model="form.acnt_certif_id"></el-input>
                </el-form-item>
                <el-form-item label="入账证件到期日" prop="acnt_certif_expire_dt">
                    <el-input v-model="form.acnt_certif_expire_dt"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="commit('form')">提交修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      form: {
        acnt_type: "",
        acnt_artif_flag: "",
        acnt_certif_tp: "",
        acnt_certif_id: "",
        acnt_certif_expire_dt: ""
      }
    };
  },
  created() {
    let data = this.$route.query.data;
    let obj = Object.assign(this.form, data);
    // console.log(this.form);
  },
  methods: {
    commit(formName) {
      let data = this.form;
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url.modifyEnList, data).then(function(res) {
            if (res.data.code == 1) {
              _this.$message({
                message: "修改成功",
                type: "success"
              });
              _this.$router.push("/merchantList");
            }
          });
          // console.log(data);
        } else {
          //   this.$message.error("请将带*的必填项填写完整");
          return false;
        }
      });
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
.form_info {
  width: 100%;
}
input,
.el-input {
  width: 40%;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
</style>
