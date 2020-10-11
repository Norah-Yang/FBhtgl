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
                <el-form-item label="流水号" prop="trace_no">
                    <el-input v-model="form.trace_no" disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="机构号" prop="ins_cd">
                    <el-input v-model="form.ins_cd" disabled></el-input>
                </el-form-item> -->
                <el-form-item label="商户号" prop="fy_mchnt_cd">
                    <el-input v-model="form.fy_mchnt_cd" disabled></el-input>
                </el-form-item>
                <el-form-item label="商户名称" prop="mchnt_name">
                    <el-input v-model="form.mchnt_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="二级代理机构号" prop="sub_ins_cd">
                    <el-input v-model="form.sub_ins_cd"></el-input>
                </el-form-item>
                <el-form-item label="商户简称" prop="mchnt_shortname">
                    <el-input v-model="form.mchnt_shortname"></el-input>
                </el-form-item>
                <el-form-item label="商户真实名称" prop="real_name">
                    <el-input v-model="form.real_name"></el-input>
                </el-form-item>
                <el-form-item label="证件类型" prop="license_type">
                    <el-select v-model="form.license_type" clearable>
                        <el-option label="营业执照" value="0"></el-option>
                        <el-option label="三证合一" value="1"></el-option>
                        <el-option label="身份证" value="A"></el-option>
                        <el-option label="个体户" value="B"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="license_no">
                        <el-input v-model="form.license_no"></el-input>
                </el-form-item>
                <el-form-item label="证件到期日" prop="license_expire_dt">
                    <el-input v-model="form.license_expire_dt"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号" prop="certif_id">
                    <el-input v-model="form.certif_id"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证到期日" prop="certif_id_expire_dt">
                    <el-input v-model="form.certif_id_expire_dt"></el-input>
                </el-form-item>
                <el-form-item label="商户经营地市代码" prop="city_cd">
                    <el-input v-model="form.city_cd"></el-input>
                </el-form-item>
                <el-form-item label="商户经营地区县代码" prop="county_cd">
                    <el-input v-model="form.county_cd"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名" prop="contact_person">
                    <el-input v-model="form.contact_person"></el-input>
                </el-form-item>
                <el-form-item label="客服电话" prop="contact_phone">
                    <el-input v-model="form.contact_phone"></el-input>
                </el-form-item>
                <el-form-item label="商户经营地联系地址" prop="contact_addr">
                    <el-input v-model="form.contact_addr"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contact_mobile">
                    <el-input v-model="form.contact_mobile"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱" prop="contact_email">
                    <el-input v-model="form.contact_email"></el-input>
                </el-form-item>
                <el-form-item label="经营范围代码" prop="business">
                    <el-input v-model="form.business"></el-input>
                </el-form-item>
                <el-form-item label="入账卡类型" prop="acnt_type">
                    <el-select v-model="form.acnt_type" clearable >
                        <el-option label="对公" value="1"></el-option>
                        <el-option label="对私" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行别" prop="bank_type">
                    <el-select v-model="form.bank_type" prop placeholder="请选择" clearable>
                        <el-option
                            v-for="item in bankType"
                            :key="item.back_code"
                            :label="item.back_name"
                            :value="item.back_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入账卡开户行联行号" prop="inter_bank_no">
                    <el-input v-model="form.inter_bank_no"></el-input>
                </el-form-item>
                <el-form-item label="入账卡开户行名称" prop="iss_bank_nm">
                    <el-input v-model="form.iss_bank_nm"></el-input>
                </el-form-item>
                <el-form-item label="入账卡户名" prop="acnt_nm">
                    <el-input v-model="form.acnt_nm"></el-input>
                </el-form-item>
                <el-form-item label="入账卡号" prop="acnt_no">
                    <el-input v-model="form.acnt_no"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名" prop="artif_nm">
                    <el-input v-model="form.artif_nm"></el-input>
                </el-form-item>
                <el-form-item label="法人入账标识 " prop="acnt_artif_flag">
                    <el-select v-model="form.acnt_artif_flag" clearable>
                        <el-option label="非法人入账" value="0"></el-option>
                        <el-option label="法人入账" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入账证件类型" prop="acnt_certif_tp">
                    <el-input v-model="form.acnt_certif_tp"></el-input>
                </el-form-item>
                <el-form-item label="入账证件号" prop="acnt_certif_id">
                    <el-input v-model="form.acnt_certif_id"></el-input>
                </el-form-item>
                <el-form-item label="入账证件到期日" prop="acnt_certif_expire_dt">
                    <el-input v-model="form.acnt_certif_expire_dt"></el-input>
                </el-form-item>
                <el-form-item label="退货标识" prop="th_flag">
                    <el-select v-model="form.th_flag" clearable>
                        <el-option label="不能退货" value="0"></el-option>
                        <el-option label="可以退货" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="微信支付标识" prop="wx_flag">
                    <el-select v-model="form.wx_flag" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="微信扣率套餐代码" prop="wx_set_cd">
                    <!-- 数据列表 -->
                    <el-select filterable clearable v-model="form.wx_set_cd" placeholder="请选择">
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付宝支付标识" prop="ali_flag">
                    <el-select v-model="form.ali_flag" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付宝扣率套餐代码" prop="ali_set_cd">
                    <!-- 数据列表 -->
                    <el-select filterable clearable v-model="form.ali_set_cd" placeholder="请选择">
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QQ钱包支付标识" prop="qpay_flag">
                    <el-select v-model="form.qpay_flag" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QQ钱包扣率套餐代码" prop="qpay_set_cd">
                    <!-- 数据列表 -->
                    <el-select filterable clearable v-model="form.qpay_set_cd" placeholder="请选择">
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="JD钱包支付标识" prop="jdpay_flag">
                    <el-select v-model="form.jdpay_flag" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="JD钱包扣率套餐代码" prop="jdpay_set_cd">
                    <!-- 数据列表 -->
                    <el-select filterable clearable v-model="form.jdpay_set_cd" placeholder="请选择">
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清算类型" prop="settle_tp">
                    <el-select v-model="form.settle_tp" clearable>
                        <el-option label="自动结算（T1）" value="1"></el-option>
                        <el-option label="手动结算" value="2"></el-option>
                        <el-option label="自动结算（D1）" value="3"></el-option>
                        <el-option label="定时结算" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清算类型扣率套餐代码" prop="settle_tp_cd">
                    <el-input v-model="form.settle_tp_cd"></el-input>
                </el-form-item>
                <el-form-item label="清算时间" prop="settle_ts">
                    <el-input v-model="form.settle_ts"></el-input>
                </el-form-item>
                <el-form-item label="联系人身份证号" prop="contact_cert_no">
                    <el-input v-model="form.contact_cert_no"></el-input>
                </el-form-item>
                <el-form-item label="营业执照开始时间" prop="license_start_dt">
                    <el-input v-model="form.license_start_dt"></el-input>
                </el-form-item>
                <el-form-item label="营业执照注册地址" prop="lic_regis_addr">
                    <el-input v-model="form.lic_regis_addr"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证开始时间" prop="card_start_dt">
                    <el-input v-model="form.card_start_dt"></el-input>
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
        sub_ins_cd: "",
        mchnt_shortname: "",
        real_name: "",
        license_type: "",
        license_no: "",
        license_expire_dt: "",
        certif_id: "",
        certif_id_expire_dt: "",
        city_cd: "",
        county_cd: "",
        contact_person: "",
        contact_phone: "",
        contact_addr: "",
        contact_mobile: "",
        contact_email: "",
        business: "",
        acnt_type: "",
        bank_type: "",
        inter_bank_no: "",
        iss_bank_nm: "",
        acnt_nm: "",
        acnt_no: "",
        artif_nm: "",
        acnt_artif_flag: "",
        acnt_certif_tp: "",
        acnt_certif_id: "",
        acnt_certif_expire_dt: "",
        th_flag: "",
        wx_flag: "",
        wx_set_cd: "",
        ali_flag: "",
        ali_set_cd: "",
        qpay_flag: "",
        qpay_set_cd: "",
        jdpay_flag: "",
        jdpay_set_cd: "",
        settle_tp: "",
        settle_tp_cd: "",
        settle_ts: "",
        contact_cert_no: "",
        license_start_dt: "",
        lic_regis_addr: "",
        card_start_dt: ""
      },
      bankType: [],
      rate:[]
    };
  },
  created() {
    // console.log(this.$route.query.row)
    let data = this.$route.query.data;
    let obj = Object.assign(this.form, data);
    // console.log(data);
    //行别
    const _this = this;
    this.$axios.get(url.bankType).then(function(res) {
      _this.bankType = res.data.data;
    //   console.log(res.data.data);
    });
    //扣率
    this.$axios
      .get(url.getRate)
      .then(function(res) {
        _this.rate = res.data.data;
      })
      .catch(function(err) {
        // console.log(err);
      });
  },
  methods: {
      commit(formName) {
      let data = this.form;
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(url.modifyMchnList,data)
            .then(function(res) {
                if(res.data.code==1){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    _this.$router.push("/merchantList");
                }
            });            
            
        } else {
          return false;
        }
      });
    },
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
