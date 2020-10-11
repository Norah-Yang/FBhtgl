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
                <!-- <el-form-item label="机构号" prop="insCd">
                    <el-input v-model="form.insCd"></el-input>
                </el-form-item> -->
                <el-form-item label="商户号" >
                    <el-input v-model="form.mchntCd" disabled></el-input>
                </el-form-item>
                <el-form-item label="商户名称" >
                    <el-input v-model="form.mchntName" disabled></el-input>
                </el-form-item>
                <el-form-item label="商户简称">
                    <el-input v-model="form.mchntShortname"></el-input>
                </el-form-item>
                <el-form-item label="商户全称">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="商户开通状态">
                    <el-select v-model="form.insSt" clearable>
                        <el-option label="开通" value="1"></el-option>
                        <el-option label="关闭" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付宝开通状态">
                    <el-select v-model="form.aliFlag" clearable>
                        <el-option label="开通" value="1"></el-option>
                        <el-option label="关闭" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="微信开通状态">
                    <el-select v-model="form.wxFlag" clearable>
                        <el-option label="开通" value="1"></el-option>
                        <el-option label="关闭" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="form.licenseType" clearable>
                        <el-option label="营业执照" value="0"></el-option>
                        <el-option label="三证合一" value="1"></el-option>
                        <el-option label="身份证" value="A"></el-option>
                        <el-option label="个体户" value="B"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input v-model="form.licenseNo"></el-input>
                </el-form-item>
                <el-form-item label="证件到期日">
                    <el-input v-model="form.licenseExpireDt"></el-input>
                </el-form-item>
                <el-form-item label="法人姓名">
                    <el-input v-model="form.artifNm"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号">
                    <el-input v-model="form.certifId"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证到期日">
                    <el-input v-model="form.certifIdExpireDt"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名">
                    <el-input v-model="form.contactPerson"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="form.contactMobile"></el-input>
                </el-form-item>
                <el-form-item label="客服电话">
                    <el-input v-model="form.contactPhone"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱">
                    <el-input v-model="form.contactEmail"></el-input>
                </el-form-item>
                <el-form-item label="省">
                    <el-input v-model="form.provCd"></el-input>
                </el-form-item>
                <el-form-item label="市代码">
                    <el-input v-model="form.cityCd"></el-input>
                </el-form-item>
                <el-form-item label="区代码">
                    <el-input v-model="form.countyCd"></el-input>
                </el-form-item>
                <el-form-item label="清算类型">
                    <el-select v-model="form.settleTp" clearable>
                        <el-option label="自动结算" value="1"></el-option>
                        <el-option label="手动结算" value="2"></el-option>
                        <el-option label="自动结算（D1）" value="3"></el-option>
                    </el-select>
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
            form:{},
            mchntCd:'',
            mchntName:'',
        }
    },
    created() {
        let _this = this;
        let data = this.$route.query.data;
        this.$axios.post(url.searchMchnList,data).then(function(res){
            _this.form = res.data;
        })
        this.mchntCd = data.mchntCd;
        this.mchntName = data.mchntName;
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.data =JSON.parse(to.query.data);
            console.log(vm.data)
        })
    },
    methods: {
         
    },
}
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
