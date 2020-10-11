<template>
    <div>
        <!-- 步骤导航 -->
        <el-steps :active="stepSuc.length-1" finish-status="success" simple>
            <el-step
                v-for="item in stepData"
                :key="item.index"
                :title="item.title"
                :class="stepClassObj(item.index)"
                @click.native="handleStep(item.index)"
            ></el-step>
        </el-steps>
        <!-- 基本信息 -->
        <div class="form_info" v-show="active===0">
            <nav>
                <span>商户基本信息</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <div style="margin: 20px;"></div>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="180px"
                ref="ruleForm"
                size="mini"
                :inline-message="true"
                :show-message="false"
            >
                <el-form-item label="商户类别" prop="license_type">
                    <el-select v-model="ruleForm.license_type" @change="license_type" clearable>
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="企业" value="1"></el-option>
                        <el-option label="个体工商户" value="2"></el-option>
                        <!-- <el-option label="小微" value="A"></el-option> -->
                        <el-option label="其他" value="4"></el-option>
                        <el-option label="事业单位" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="商户代码" prop="ins_cd">
                    <el-input v-model="ruleForm.ins_cd" disabled></el-input>
                </el-form-item>-->
                <el-form-item label="商户名称" prop="mchnt_name">
                    <el-input v-model="ruleForm.mchnt_name"></el-input>
                    <span>与营业执照一致，如遇重复加数字。如：个体户张三2</span>
                </el-form-item>
                <el-form-item label="凭条打印名称" prop="real_name">
                    <el-input v-model="ruleForm.real_name"></el-input>
                    <span>营业执照名称，或按XX市XX鞋店/药店/KTV/美容院等填写</span>
                </el-form-item>
                <el-form-item label="企业名称" prop="mchnt_shortname">
                    <el-input v-model="ruleForm.mchnt_shortname"></el-input>
                    <span>填写营业执照户名，无字号/小微商户填写个体户XXX（法人/实际经营人）</span>
                </el-form-item>
                <el-form-item label="经营范围（主营业务）" prop="business">
                    <el-select
                        v-model="category_cd"
                        prop
                        @change="category"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="item in categoryList"
                            :key="item.id"
                            :label="item.son_title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.business" prop placeholder="请选择" clearable>
                        <el-option
                            v-for="item in cateList"
                            :key="item.run_category_id"
                            :label="item.system_title"
                            :value="item.run_category_id"
                        ></el-option>
                    </el-select>
                    <span>按营业执照主营业务或实际经营范围填写</span>
                </el-form-item>
                <el-form-item label="注册地址" prop="lic_regis_addr">
                    <el-input v-model="ruleForm.lic_regis_addr"></el-input>
                    <span>按营业执照注册地址填写，小微商户填写可联系地址</span>
                </el-form-item>
                <el-form-item label="商户所在地区" prop required>
                    <el-select
                        v-model="province_cd"
                        prop
                        @change="linkage_city"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="item in province"
                            :key="item.province_code"
                            :label="item.province_name"
                            :value="item.province_code"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-model="ruleForm.city_cd"
                        prop
                        clearable
                        @change="linkage_country"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in city"
                            :key="item.city_code"
                            :label="item.city_name"
                            :value="item.city_code"
                        ></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.county_cd" prop placeholder="请选择" clearable>
                        <el-option
                            v-for="item in country"
                            :key="item.county_code"
                            :label="item.county_name"
                            :value="item.county_code"
                        ></el-option>
                    </el-select>
                    <span>按终端使用地址填写市/区，区县不在列表请选邻县</span>
                </el-form-item>
                <el-form-item label="联系地址" prop="contact_addr">
                    <el-input v-model="ruleForm.contact_addr"></el-input>
                    <span>终端使用地址精确到XX路XX号，没有门牌号下方备注说明</span>
                </el-form-item>
                <el-form-item label="联系人" prop="contact_person">
                    <el-input v-model="ruleForm.contact_person"></el-input>
                    <span>必须写全名</span>
                </el-form-item>
                <el-form-item label="联系人身份证号码" prop="contact_cert_no">
                    <el-input v-model="ruleForm.contact_cert_no"></el-input>
                </el-form-item>
                <el-form-item label="联系人身份证到期日" prop="license_expire_dt">
                    <el-input v-model="ruleForm.license_expire_dt"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="contact_email">
                    <el-input v-model="ruleForm.contact_email"></el-input>
                </el-form-item>
                <el-form-item label="联系手机" prop="contact_mobile">
                    <el-input v-model="ruleForm.contact_mobile"></el-input>
                    <span>请再次核对，避免商户收不到账号密码等重要信息</span>
                </el-form-item>
                <el-form-item label="联系固话" prop="contact_phone" required>
                    <el-input v-model="ruleForm.contact_phone"></el-input>
                    <span>推荐<font>400-</font>开头电话或<font>11位</font>有效手机号</span>
                </el-form-item>
                <el-form-item label="分支机构" prop="sub_ins_cd">
                    <el-select v-model="ruleForm.sub_ins_cd" placeholder="请选择" clearable>
                        <el-option label="西安卓越网络-二级" value="xianzhuoyue"></el-option>
                    </el-select>
                    <span>
                        若无分支机构请选择
                        <font>‘西安卓越网络-二级’</font>即可
                    </span>
                </el-form-item>
                <el-form-item label="业务员" prop="sales_man">
                    <el-select v-model="ruleForm.sales_man" placeholder="请选择" clearable>
                        <el-option label="xxxxxx" value="xxxxxx"></el-option>
                    </el-select>
                    <span>请填写至商户现场的实名认证业务员。如未进行实名认证，可至“业务员管理”菜单中添加</span>
                </el-form-item>
                <nav>
                    <span>扣率信息</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item label="微信业务标识" prop="wx_busi_flag">
                    <el-select v-model="ruleForm.wx_busi_flag" placeholder="请选择" clearable>
                        <el-option label="微信一般类" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否开通受理微信支付" prop="wx_flag">
                    <el-select v-model="ruleForm.wx_flag" placeholder="请选择" clearable>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扣率" prop="wx_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="ruleForm.wx_set_cd"
                        placeholder="请选择"
                        clearable
                        :disabled="ruleForm.wx_flag==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否开通受理支付宝支付" prop="ali_flag">
                    <el-select v-model="ruleForm.ali_flag" placeholder="请选择" clearable>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="扣率" prop="ali_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="ruleForm.ali_set_cd"
                        placeholder="请选择"
                        :disabled="ruleForm.ali_flag==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退货标识" prop="th_flag">
                    <el-select v-model="ruleForm.th_flag" placeholder="请选择" disabled clearable>
                        <el-option label="不能退货" value="0"></el-option>
                        <el-option label="可以退货" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QQ钱包支付标识" prop="qpay_set_cd">
                    <el-select v-model="ruleForm.th_flag" placeholder="请选择" disabled clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="QQ钱包扣率套餐代码" prop="qpay_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="ruleForm.qpay_set_cd"
                        placeholder="请选择"
                        :disabled="ruleForm.jdpay_flag==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="JD钱包支付标识" prop="jdpay_flag">
                    <el-select v-model="ruleForm.th_flag" placeholder="请选择" disabled clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="JD钱包扣率套餐代码" prop="jdpay_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="ruleForm.jdpay_set_cd"
                        placeholder="请选择"
                        :disabled="ruleForm.jdpay_flag==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结算方式" prop="settle_tp">
                    <el-select
                        v-model="ruleForm.settle_tp"
                        placeholder="请选择"
                        @change="judge"
                        clearable
                    >
                        <el-option label="自动结算（T1）" value="1"></el-option>
                        <el-option label="自动结算（天天结）" value="3"></el-option>
                        <el-option label="定时结算" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="清算时间" prop="settle_ts">
                    <el-input v-model="ruleForm.settle_ts"></el-input>
                </el-form-item>
                <el-form-item label="自动结算（天天结）扣率" prop="settle_tp_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        clearable
                        v-model="ruleForm.settle_tp_cd"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in rated"
                            :key="item.d_code"
                            :label="item.d_code+'----'+item.d_name"
                            :value="item.d_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <nav>
                    <span>法人身份证明</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item label="法人姓名" prop="artif_nm">
                    <el-input v-model="ruleForm.artif_nm"></el-input>
                </el-form-item>
                <el-form-item
                    label="证件类型"
                    prop="acnt_certif_tp"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-select v-model="ruleForm.acnt_certif_tp" placeholder="请选择" clearable>
                        <el-option label="身份证" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="法人证件编号" prop="certif_id">
                    <el-input v-model="ruleForm.certif_id"></el-input>
                </el-form-item>
                <el-form-item label="法人证件有效期起始日" prop="card_start_dt">
                    <el-input v-model="ruleForm.card_start_dt"></el-input>
                </el-form-item>
                <el-form-item label="有效期至" prop="certif_id_expire_dt">
                    <el-input v-model="ruleForm.certif_id_expire_dt"></el-input>
                </el-form-item>
                <el-form-item
                    label="法人入账标识"
                    prop="acnt_artif_flag"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-select
                        v-model="ruleForm.acnt_artif_flag"
                        placeholder="请选择"
                        clearable
                        @change="ruleForm.acnt_artif_flag==0?rules.acnt_certif_tp[0].required = true:rules.acnt_certif_tp[0].required = false"
                    >
                        <el-option label="非法人入账" value="0"></el-option>
                        <el-option label="法人入账" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <nav>
                    <span>营业执照</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item label="证件代码" prop="license_no">
                    <el-input v-model="ruleForm.license_no" placeholder="营业执照/身份证"></el-input>
                </el-form-item>
                <el-form-item label="证件有效期起始日期" prop="license_start_dt">
                    <el-input v-model="ruleForm.license_start_dt"></el-input>
                </el-form-item>
                <el-form-item
                    label="证件到期日"
                    prop="acnt_certif_expire_dt"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.acnt_certif_expire_dt"></el-input>
                    <span>
                        到期日为长期时填写<font>20991231</font>
                    </span>
                </el-form-item>
                <nav>
                    <span>清算信息</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item label="结算方式" prop="acnt_type">
                    <el-select
                        v-model="ruleForm.acnt_type"
                        clearable
                        placeholder="请选择"
                        @change="acntType"
                    >
                        <el-option label="对公" value="1"></el-option>
                        <el-option label="对私" value="2"></el-option>
                        <el-option label="双账户" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <nav v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0">
                    <span>对私</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item
                    label="入账卡户名"
                    prop="acnt_nm"
                    v-if="ruleForm.acnt_type=='2'||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.acnt_nm"></el-input>
                </el-form-item>
                <el-form-item
                    label="账号"
                    prop="acnt_no"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.acnt_no"></el-input>
                </el-form-item>
                <el-form-item
                    label="确认账号"
                    prop="acnt_no_check"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-input v-model="acnt_no_check" @blur="isSame"></el-input>
                </el-form-item>
                <el-form-item
                    label="身份证号"
                    prop="acnt_certif_id"
                    v-if="ruleForm.acnt_type=='2'||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.acnt_certif_id"></el-input>
                </el-form-item>
                <el-form-item
                    label="入账人银行预留电话"
                    prop="acnt_contact_mobile"
                    v-if="ruleForm.acnt_type==2||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.acnt_contact_mobile"></el-input>
                </el-form-item>
                <nav v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0">
                    <span>对公</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item
                    label="开户行所在地区"
                    prop
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-select
                        v-model="province_code"
                        prop
                        @change="linkage_citys"
                        placeholder="开户行省"
                        clearable
                    >
                        <el-option
                            v-for="item in province"
                            :key="item.province_code"
                            :label="item.province_name"
                            :value="item.province_code"
                        ></el-option>
                    </el-select>
                    <el-select v-model="city_code" prop clearable placeholder="开户行市">
                        <el-option
                            v-for="item in citys"
                            :key="item.city_code"
                            :label="item.city_name"
                            :value="item.city_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="行别"
                    prop="reserve_bank_type"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-select
                        v-model="ruleForm.reserve_bank_type"
                        prop
                        placeholder="请选择"
                        @change="getBankNo"
                        clearable
                    >
                        <el-option
                            v-for="item in bankType"
                            :key="item.back_code"
                            :label="item.back_name"
                            :value="item.back_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="开户行名称"
                    prop="reserve_iss_bank_nm"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        clearable
                        v-model="ruleForm.reserve_iss_bank_nm"
                        placeholder="请选择"
                        @change="chooseCore"
                    >
                        <el-option
                            v-for="item in bankMesList"
                            :key="item.unionpay_no"
                            :label="item.back_name+'-'+item.unionpay_no"
                            :value="item.back_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="入账卡开户行联行号"
                    prop="reserve_inter_bank_no"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.reserve_inter_bank_no"></el-input>
                </el-form-item>
                <el-form-item
                    label="入账卡户名"
                    prop="reserve_acnt_nm"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.reserve_acnt_nm"></el-input>
                </el-form-item>
                <el-form-item
                    label="账号"
                    prop="reserve_acnt_no"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-input v-model="ruleForm.reserve_acnt_no"></el-input>
                </el-form-item>
                <el-form-item
                    label="确认账号"
                    prop="check_reserve_acnt_no"
                    v-if="ruleForm.acnt_type==1||ruleForm.acnt_type==0"
                >
                    <el-input v-model="check_reserve_acnt_no" @blur="isSames"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="commit('ruleForm')">提交</el-button>
                    <el-button type="primary" @click="next" :disabled="disabled">下一页</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 提交照片 -->
        <div class="form_info" v-show="active===1">
            <nav>
                <span>提交照片</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <div style="margin: 20px;"></div>
            <el-form
                label-position="right"
                :rules="rules"
                :model="picForm"
                label-width="190px"
                ref="picForm"
                size="mini"
            >
                <el-form-item
                    label="营业执照照片"
                    prop="pic_1"
                    :required="picForm.license_type=(1||2||3)?true:false"
                >
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:1}"
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商户增值协议照片">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:3}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证正面照片" :required="true">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:4}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证反面照片" :required="true">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:5}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="门脸照片" :required="true">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:6}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="门头照片" :required="true">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:7}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="组织机构代码证照片" :required="picForm.license_type=1?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:8}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                        <font>非三证合一的旧营业执照必填</font>
                    </el-upload>
                </el-form-item>
                <el-form-item label="税务登记证照片" :required="picForm.license_type=1?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:9}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                        <font>非三证合一的旧营业执照必填</font>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="对私账户身份证正面照片"
                    :required="picForm.acnt_artif_flag='0'?true:false"
                >
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:10}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="对私账户身份证反面照片"
                    :required="picForm.acnt_artif_flag='0'?true:false"
                >
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:11}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <!-- 对私必填 -->
                <el-form-item label="入账银行正面照片" :required="picForm.acnt_type='2'?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:12}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="入账非法人证明照片" :required="picForm.acnt_artif_flag='0'?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:13}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item
                    label="开户许可证照片"
                    :required="((picForm.acnt_type='1')||(picForm.license_type='1'))?true:false"
                >
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:14}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分账承诺函">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:15}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="手持证件照片" :required="picForm.license_type='4'?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:16}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商户总分店关系证明">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:17}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商户补充资料">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:18}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="蓝海收银台照片">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:19}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="蓝海门店内景照片">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:20}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="蓝海餐饮平台入驻照片">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:21}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="事业单位证明函" :required="picForm.license_type=4?true:false">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:22}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="经营许可证">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl()"
                        accept=".jpg"
                        name="image"
                        :data="{mchnt_cd,type:23}"
                        multiple
                        :limit="1"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1M</span>
                    </el-upload>
                </el-form-item>
                <div style="margin: 20px;"></div>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="finish">完成</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 法人身份证明 -->
        <!-- <div class="form_info" v-show="active===2">
            <nav>
                <span>法人身份证明</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <div style="margin: 20px;"></div>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="170px"
                ref="ruleForm"
                size="mini"
            >
                <el-form-item label="商户代码">
                    <font>{{code}}</font>
                </el-form-item>
                <el-form-item label="商户名称">
                    <font>xxxxxxxxxxx</font>
                </el-form-item>
                <el-form-item label="证件类型" prop="IdCardtype">
                    <el-select v-model="ruleForm.IdCardtype" placeholder="请选择">
                        <el-option label="身份证" value="ident"></el-option>
                        <el-option label="港澳台通行证" value="gangaotai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="人像页面" prop="personPage">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="国徽页面" prop="emblemPage">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!-- </el-form-item>
            </el-form>
        </div>-->
        <!-- 受益人信息 -->
        <!-- <div class="form_info" v-show="active===3">
            <nav>
                <span>
                    受益人相关资料
                    <font>（相关辅助材料，如：注册证书、存续证明文件、合作协议、公司章程、备忘录等）</font>
                </span>
            </nav>
            <div style="margin: 20px;"></div>
            <nav>
                <span>受益人信息</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="180px"
                ref="ruleForm"
                size="mini"
            >
                <el-form-item label="商户代码">
                    <font>{{code}}</font>
                </el-form-item>
                <el-form-item label="商户名称">
                    <font>xxxxxxxxxxx</font>
                </el-form-item>
                <el-form-item label="受益所有人姓名" prop="beneficiaryName">
                    <el-input v-model="ruleForm.beneficiaryName"></el-input>
                </el-form-item>
                <el-form-item label="受益所有人地址" prop="beneficiaryAdd">
                    <el-input v-model="ruleForm.beneficiaryAdd"></el-input>
                </el-form-item>
                <el-form-item label="受益所有人身份证件种类" prop="beneficiaryIdType">
                    <el-select v-model="ruleForm.beneficiaryIdType" placeholder="请选择">
                        <el-option label="身份证" value="ident"></el-option>
                        <el-option label="港澳台通行证" value="gangaotai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="受益所有人证件号码" prop="beneficiaryIdNum">
                    <el-input v-model="ruleForm.beneficiaryIdNum"></el-input>
                </el-form-item>
                <el-form-item label="受益所有人证件有效期" prop="beneficiaryIdLimit">
                    <el-radio-group v-model="ruleForm.beneficiaryIdLimit">
                        <el-radio label="长期"></el-radio>
                        <el-input></el-input>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="受益所有人认定类型" prop="beneficiaryType">
                    <el-select v-model="ruleForm.beneficiaryType" placeholder="请选择">
                        <el-option label="股权" value="guquan"></el-option>
                        <el-option label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="持股数量" prop="sharesNum">
                    <el-input v-model="ruleForm.sharesNum"></el-input>
                    <span>※（请填写持股比例，只填写数字）</span>
                </el-form-item>
                <el-form-item label="持股类型" prop="sharesType">
                    <el-input v-model="ruleForm.sharesType"></el-input>
                </el-form-item>
                <el-form-item label="证件扫描照片正面" prop="paperFront">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="证件扫描照片反面" prop="paperBack">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!-- </el-form-item>
            </el-form>
        </div>-->
        <!-- 营业执照 -->
        <!-- <div class="form_info" v-show="active===4">
            <div style="margin: 20px;"></div>
            <nav>
                <span>营业执照信息</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="180px"
                ref="ruleForm"
                size="mini"
            >
                <el-form-item label="商户代码">
                    <font>{{code}}</font>
                </el-form-item>
                <el-form-item label="商户名称">
                    <font>xxxxxxxxxxx</font>
                </el-form-item>
                <el-form-item label="证件类型" prop="licenseType">
                    <el-select v-model="ruleForm.type" placeholder="请选择">
                        <el-option label="（营业执照）三证合一" value="yingyezhizhao"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="有效期" prop="licenseLimit">
                    <el-radio-group v-model="ruleForm.licenseLimit">
                        <el-radio label="长期"></el-radio>
                    </el-radio-group>
                    <span>若没有具体的有效日期，请选择“长期”</span>
                </el-form-item>
                <el-form-item label="营业执照扫描照片" prop="licensePic">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                        <span>小微商户请上传手持身份证照片，证件号码必须清晰哦！</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="协议左照片" prop="licensePicLeft">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                        <span>下载模板实例</span>
                    </el-upload>
                </el-form-item>
                <el-form-item label="协议右照片" prop="licensePicRight">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!-- </el-form-item>
            </el-form>
        </div>-->
        <!-- 清算信息 -->
        <!-- <div class="form_info" v-show="active===5">
            <div style="margin: 20px;"></div>
            <nav>
                <span>结算方式</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="180px"
                ref="ruleForm"
                size="mini"
            >
                <el-form-item label="商户代码">
                    <font>{{code}}</font>
                </el-form-item>
                <el-form-item label="商户名称">
                    <font>xxxxxxxxxxx</font>
                </el-form-item>
                <el-form-item label="结算方式" prop="clearWay">
                    <el-select v-model="ruleForm.clearWay" placeholder="请选择">
                        <el-option label="对私清算" value="duisi"></el-option>
                    </el-select>
                </el-form-item>
                <div style="margin: 20px;"></div>
                <nav>
                    <span>结算方式</span>
                    <span>
                        注：带
                        <font>*</font>为必填项
                    </span>
                </nav>
                <el-form-item label="户名" prop="accountName">
                    <el-input v-model="ruleForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="accountIdNum">
                    <el-input v-model="ruleForm.accountIdNum"></el-input>
                    <span>护照/通行证等其他开户证件，请用数字“0”补齐至18位</span>
                </el-form-item>
                <el-form-item label="账号" prop="accountNum">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="确认账号" prop="accountNum2">
                    <el-input v-model="ruleForm.accountNum2"></el-input>
                </el-form-item>
                <el-form-item label="银行卡正面扫描照片" prop="bankCardFront">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商户关系证明协议" prop="treaty">
                    <font>如入账人非法人，需提供</font>
                    <span>下载模板示例</span>
                </el-form-item>
                <el-form-item label="入账人银行预留手机号" prop="accountPhone">
                    <el-input v-model="ruleForm.accountPhone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!-- </el-form-item>
            </el-form>
        </div>-->
        <!-- 补充资料 -->
        <!-- <div class="form_info" v-show="active===6">
            <div style="margin: 20px;"></div>
            <nav>
                <span>补充资料上传</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <div style="margin: 20px;text-align:center;">
                <span>注：若需要上传补充资料，请点击“新增附件上传”按钮</span>
            </div>
            <el-form
                label-position="right"
                :rules="rules"
                :model="ruleForm"
                label-width="180px"
                ref="ruleForm"
                size="mini"
            >
                <el-form-item label="商户代码">
                    <font>{{code}}</font>
                </el-form-item>
                <el-form-item label="商户名称">
                    <font>xxxxxxxxxxx</font>
                </el-form-item>
                <el-form-item label="门头照片" prop="doorHeadPic">
                    action：上传的地址
                    on-preview：点击文件列表中已上传的文件时的钩子
                    on-remove：文件列表移除文件时的钩子
                    before-remove：删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
                    multiple：是否支持文件多选
                    on-exceed:文件超出个数限制时的钩子
        file-list：上传的文件列表-->
        <!-- <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
        </el-upload>-->
        <!-- </el-form-item>
                <el-form-item label="门脸照片" prop="shopFrontPic">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内设照片" prop="shopInsidePic">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button size="small" type="success">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="prev">上一步</el-button>
                    <el-button type="primary" @click="next">下一步</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        <!-- </el-form-item>
            </el-form>
        </div>-->
        <!-- 提交审核 -->
        <!-- <div class="form_info" v-show="active===7">
            <div style="margin: 20px;"></div>
            <nav>
                <span>录入完成情况</span>
                <span>
                    注：带
                    <font>*</font>为必填项
                </span>
            </nav>
            <div style="margin: 5px;width:50%;text-align:center;">
                <font>{{code}}：{{name}}</font>
            </div>
            <el-table
                :data="stepData"
                style="width: 50%"
            >
                <el-table-column label="是否完成">
                    <template slot-scope="scope">
                        <i
                            v-if="scope.row.state==false"
                            class="el-icon-circle-close"
                            style="font-size:20px;color:#047504;"
                        ></i>
                        <i v-else class="el-icon-circle-check" style="font-size:20px;color:#f56c6c"></i>
                    </template>
                </el-table-column>
                <el-table-column label="页面" prop="title"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="skip(scope.$index, scope.row)">返回修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p class="submit_review">
                <font>审核意见：营业执照已注销</font>
            </p>
        </div>-->
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      active: 0,
      // 已完成步骤
      stepSuc: [0],
      stepData: [
        { index: 0, title: "基本信息", state: true },
        { index: 1, title: "上传照片", state: true },
        { index: 2, title: "暂定", state: true },
        { index: 3, title: "暂定", state: false },
        { index: 4, title: "暂定", state: false },
        { index: 5, title: "暂定", state: false },
        // { index: 6, title: "终端信息",state:false },
        { index: 6, title: "暂定", state: false },
        { index: 7, title: "暂定", state: false }
      ],
      ruleForm: {
        license_type: "",
        // ins_cd: "",
        mchnt_name: "",
        real_name: "",
        mchnt_shortname: "",
        business: "",
        lic_regis_addr: "",
        city_cd: "",
        county_cd: "",
        contact_addr: "",
        contact_person: "",
        contact_cert_no: "",
        license_expire_dt: "",
        contact_email: "",
        contact_mobile: "",
        contact_phone: "",
        sub_ins_cd: "",
        sales_man: "",

        wx_busi_flag: "0",
        wx_flag: "",
        wx_set_cd: "",
        ali_flag: "",
        ali_set_cd: "",
        th_flag: "0",
        qpay_flag: "0",
        qpay_set_cd: "M0000",
        jdpay_flag: "0",
        jdpay_set_cd: "M0000",
        settle_tp: "1",
        //--------
        settle_tp_cd: "",
        artif_nm: "",
        certif_id: "",
        card_start_dt: "",
        certif_id_expire_dt: "",
        license_no: "",
        acnt_type: "",
        acnt_nm: "",
        acnt_certif_id: "",
        acnt_no: "",
        //--------
        acnt_contact_mobile: "",
        bank_type: "",
        inter_bank_no: "",
        iss_bank_nm: "",
        acnt_artif_flag: "",
        acnt_certif_tp: "",
        acnt_certif_expire_dt: "",
        //-------\
        settle_ts: "",
        has_reserve_acnt: "",
        reserve_acnt_no: "",
        reserve_acnt_nm: "",
        reserve_inter_bank_no: "",
        reserve_iss_bank_nm: "",
        reserve_bank_type: "",
        license_start_dt: ""
      },
      province_cd: "",
      province_code: "",
      acnt_no_check: "",
      check_reserve_acnt_no: "",
      picForm: {},
      rules: {
        license_type: [{ required: true, message: " " }],
        mchnt_name: [{ required: true, message: " " }],
        real_name: [{ required: true, message: " " }],
        mchnt_shortname: [{ required: true, message: " " }],
        business: [{ required: true, message: " " }],
        lic_regis_addr: [{ required: true, message: " " }],
        province_cd: [{ required: false, message: " " }],
        city_cd: [{ required: true, message: " " }],
        county_cd: [{ required: true, message: " " }],
        contact_addr: [{ required: true, message: " " }],
        contact_person: [{ required: true, message: " " }],
        license_expire_dt: [{ required: true, message: " " }],
        contact_email: [{ required: true, message: " " }],
        contact_mobile: [{ required: true, message: " " }],
        contact_phone: [{ required: false, message: " " }],
        sub_ins_cd: [{ required: false, message: " " }],
        sales_man: [{ required: false, message: " " }],

        wx_busi_flag: [{ required: false, message: " " }],
        wx_flag: [{ required: true, message: " " }],
        wx_set_cd: [{ required: false, message: " " }],
        ali_flag: [{ required: true, message: " " }],
        ali_set_cd: [{ required: false, message: " " }],
        th_flag: [{ required: false, message: " " }],
        qpay_flag: [{ required: false, message: " " }],
        qpay_set_cd: [{ required: false, message: " " }],
        jdpay_flag: [{ required: false, message: " " }],
        jdpay_set_cd: [{ required: false, message: " " }],
        settle_tp: [{ required: false, message: " " }],
        //--------
        settle_tp_cd: [{ required: false, message: " " }],
        artif_nm: [{ required: true, message: " " }],
        certif_id: [{ required: true, message: " " }],
        card_start_dt: [{ required: true, message: " " }],
        certif_id_expire_dt: [{ required: true, message: " " }],
        license_no: [{ required: true, message: " " }],
        acnt_type: [{ required: true, message: " " }],
        acnt_nm: [{ required: true, message: " " }],
        acnt_certif_id: [{ required: true, message: " " }],
        acnt_no: [{ required: true, message: " " }],
        acnt_no_check: [{ required: true, message: " " }],
        //--------
        acnt_contact_mobile: [{ required: false, message: " " }],
        bank_type: [{ required: true, message: " " }],
        inter_bank_no: [{ required: true, message: " " }],
        iss_bank_nm: [{ required: true, message: " " }],
        acnt_artif_flag: [{ required: true, message: " " }],
        acnt_certif_tp: [{ required: true, message: " " }],
        acnt_certif_expire_dt: [{ required: true, message: " " }],
        //-------\
        settle_ts: [{ required: false, message: " " }],
        has_reserve_acnt: [{ required: false, message: " " }],
        reserve_acnt_no: [{ required: true, message: " " }],
        check_reserve_acnt_no: [{ required: true, message: " " }],
        reserve_acnt_nm: [{ required: false, message: " " }],
        reserve_inter_bank_no: [{ required: false, message: " " }],
        reserve_iss_bank_nm: [{ required: false, message: " " }],
        reserve_bank_type: [{ required: false, message: " " }],
        contact_cert_no: [{ required: true, message: " " }],
        license_start_dt: [{ required: true, message: " " }],
        lic_pic: [{ required: false, message: "" }]
      },
      fileList: [], //上传图片的文件列表
      province: [], //省
      city: [], //市
      citys: [], //市
      country: [], //县
      rate: [], //扣率
      rated: [], //扣率
      bankType: [], //行别，
      categoryList: [],
      cateList: [],
      bankMesList: [],
      disabled: true,
      mchnt_cd: "",
      city_code: "",
      category_cd: ""
    };
  },
  computed: {
    // 动态给步骤加样式
    stepClassObj(val) {
      return val => {
        return {
          stepSuc: this.stepSuc.includes(val),
          stepErr: !this.stepSuc.includes(val)
        };
      };
    }
  },
  created() {
    const _this = this;
    //三级联动
    this.$axios
      .get(url.getProvince, {})
      .then(function(res) {
        _this.province = res.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    //扣率
    this.$axios
      .get(url.getRate)
      .then(function(res) {
        _this.rate = res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
    //天天结扣率
    this.$axios
      .get(url.getRated)
      .then(function(res) {
        //   console.log(res.data)
        _this.rated = res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });

    //行别
    this.$axios
      .get(url.bankType, {})
      .then(function(res) {
        _this.bankType = res.data.data;
        // console.log(res.data.data);
      })
      .catch(function(error) {
        // console.log(error);
      });
  },
  methods: {
    //下一步
    next() {
      let el = this.active;
      //更改已提交表单状态
      this.stepData[this.active].state = true;
      if (this.stepSuc.indexOf(++el) == -1) {
        this.stepSuc.push(++this.active);
      } else {
        this.active++;
      }
      //   console.log(this.stepSuc.indexOf(++el)==-1);
      //   console.log(this.stepSuc);
    },
    //提交
    commit(formName) {
      let data = this.ruleForm;
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.acnt_type == 1) {
            this.ruleForm.acnt_nm = this.ruleForm.reserve_acnt_nm;
            this.ruleForm.reserve_acnt_no = "";
          }
          if (this.ruleForm.acnt_type == 0) {
            this.ruleForm.acnt_type = 2;
          }
          this.$axios.post(url.submitForm, data).then(function(res) {
            console.log(res.data);
            if (res.data.msg == "成功") {
              _this.disabled = false;
              _this.$message.success("成功");
              _this.$refs[formName].resetFields();
              _this.picForm = res.data.req;
              _this.mchnt_cd = res.data.req.fy_mchnt_cd;
            }else{
              _this.$message.error(res.data.ret_msg);
            }
          });
          // console.log(data)
        } else {
          this.$message.error("请将带*的必填项填写完整");
          return false;
        }
      });
    },
    //上一页
    prev() {
      this.active--;
    },
    skip(index, row) {
      //   console.log(row.index, this.active);
      this.active = row.index;
    },
    handleStep(index) {
      if (this.stepSuc.includes(index) === true) {
        this.active = index;
      }
    },
    //获取市
    linkage_city() {
      const _this = this;
      this.ruleForm.city_cd = "请选择"; //初始化市
      this.ruleForm.county_cd = "请选择"; //初始化县
      //   console.log(this.ruleForm.province_cd);
      let code = this.province_cd;
      this.$axios
        .get(url.getCity, {
          params: code
        })
        .then(function(res) {
          _this.city = res.data.data;
        })
        .catch(function(error) {
          //   console.log(error);
        });
      if (code == 110 || 120) {
        this.$axios
          .get(url.getCounty, {
            params: {
              province_code: code,
              city_code: ""
            }
          })
          .then(function(res) {
            _this.country = res.data.data;
          });
      }
    },
    //获取开户行市
    linkage_citys() {
      const _this = this;
      //   console.log(this.ruleForm.province_cd);
      let code = this.province_code;
      this.$axios
        .get(url.getCity, {
          params: code
        })
        .then(function(res) {
          _this.citys = res.data.data;
        })
        .catch(function(error) {
          //   console.log(error);
        });
    },
    //获取区
    linkage_country() {
      const _this = this;
      let province_cd = this.province_cd;
      let city_cd = this.ruleForm.city_cd;
      this.ruleForm.county_cd = "请选择"; //初始化县
      // console.log(province_cd,city_cd)
      this.$axios
        .get(url.getCounty, {
          params: {
            province_code: province_cd,
            city_code: city_cd
          }
        })
        .then(function(res) {
          _this.country = res.data.data;
          // console.log(res.data.data)
        })
        .catch(function(error) {
          //   console.log(error);
        });
    },
    //结算方式判断
    judge() {
      if (this.ruleForm.settle_tp == 3) {
        this.rules.settle_tp_cd[0].required = true;
      } else {
        this.rules.settle_tp_cd[0].required = false;
      }
      if (this.ruleForm.settle_tp == 4) {
        this.rules.settle_ts[0].required = true;
      } else {
        this.rules.settle_ts[0].required = false;
      }
    },
    //入账卡类型判断
    acntType() {
      const _this = this;
      if (this.ruleForm.acnt_type == 1) {
        this.rules.bank_type[0].required = true;
        this.ruleForm.has_reserve_acnt = 1;
        // this.ruleForm.bank_type = this.ruleForm.reserve_bank_type;
        // this.ruleForm.iss_bank_nm = this.ruleForm.reserve_iss_bank_nm;
        // this.ruleForm.acnt_nm = this.ruleForm.reserve_acnt_nm;
        // this.ruleForm.acnt_no = this.ruleForm.reserve_acnt_no;
        // this.ruleForm.reserve_bank_type='';
        // this.ruleForm.reserve_iss_bank_nm='';
        // this.ruleForm.reserve_acnt_nm='';
        // this.ruleForm.reserve_acnt_no='';
      } else if (this.ruleForm.acnt_type == 0) {
        //双账户时，对公：
        this.ruleForm.has_reserve_acnt = 1;
      } else {
        this.ruleForm.has_reserve_acnt = 0;
        this.rules.bank_type[0].required = false;
      }
    },
    //商户类别判断
    license_type() {
      let code = { pid: this.ruleForm.license_type };
      this.$axios.post(url.category, code).then(res => {
        this.categoryList = res.data.data;
        console.log(res.data.data);
      });

      //   if (this.ruleForm.license_type == "A") {
      //     this.ruleForm.acnt_artif_flag = "1";
      //     this.ruleForm.acnt_certif_expire_dt = this.ruleForm.license_expire_dt;
      //   }
    },
    category() {
      console.log(this.category_cd);
      this.$axios
        .get(url.cate, { params: { son_id: this.category_cd } })
        .then(res => {
          this.cateList = res.data.data;
          console.log(res.data.data);
        });
    },
    //联行号
    getBankNo() {
      let data = {
        unionpay_code: this.ruleForm.reserve_bank_type,
        city_code: this.city_code
      };
      this.$axios
        .post(url.bankMes, data)
        .then(res => {
          this.bankMesList = res.data.data;
          console.log(res.data.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    chooseCore(e) {
      // this.ruleForm.inter_bank_no=event.target.value
      this.bankMesList.forEach(item => {
        if (item.back_name === this.ruleForm.reserve_iss_bank_nm) {
          this.ruleForm.reserve_inter_bank_no = item.unionpay_no;
          return;
        }
      });
    },
    //确认账号
    isSame() {
      if (this.acnt_no_check == this.ruleForm.acnt_no) {
        this.rules.acnt_no_check[0].message = " ";
        this.rules.acnt_no_check[0].required = false;
      } else {
        this.rules.acnt_no_check[0].message = "两次输入不一致";
        this.rules.acnt_no_check[0].required = true;
        // console.log(this.rules.acnt_no_check[0].message);
      }
    },
    //确认账号
    isSames() {
      if (this.check_reserve_acnt_no == this.ruleForm.reserve_acnt_no) {
        this.rules.check_reserve_acnt_no[0].message = " ";
        this.rules.check_reserve_acnt_no[0].required = false;
      } else {
        this.rules.check_reserve_acnt_no[0].message = "两次输入不一致";
        this.rules.check_reserve_acnt_no[0].required = true;
        // console.log(this.rules.acnt_no_check[0].message);
      }
    },
    uploadUrl() {
      return url.uploadPic;
    },
    finish() {
      this.$router.push("/merchantList");
    },
    beforeUpload(file) {
      //限制文件小于1M
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message({
          message: "上传文件大小不能超过 1MB!",
          type: "warning"
        });
      }
      return isLt1M
    }
  }
};
</script>
<style scoped>
/* 步骤导航 */
.el-steps {
  height: 50px;
  font-size: 16px;
}
nav {
  width: 100%;
  background-color: #3f3e3e;
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
nav span {
  margin: 0 15px;
  font-size: 14px;
  line-height: 20px;
  color: white;
}
font {
  color: #f56c6c;
}
.stepSuc :hover {
  cursor: pointer;
}
.stepErr :hover {
  cursor: not-allowed;
}
/* 基本信息 */
.form_info {
  width: 100%;
}
input,
.el-input {
  width: 40%;
}
span {
  padding-left: 5px;
  color: #666;
  font-size: 10px;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
/* 提交审核 */
.submit_review {
  width: 50%;
  text-align: right;
  font-size: 10px;
  font-weight: bolder;
}
</style>
<style>
.el-step.is-simple:not(:last-of-type) .el-step__title {
  max-width: none;
}
</style>

