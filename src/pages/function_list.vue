<template>
    <div>
        <nav>
            <span>功能列表</span>
        </nav>
        <el-table :data="funData" style="width: 100%; margin-top:20px;">
            <el-table-column label="功能" prop="title"></el-table-column>
            <el-table-column label="操作" prop="handle">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                    >{{scope.row.handle}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作结果" prop="contain"></el-table-column>
        </el-table>
        <!-- 商户渠道子商户号 -->
        <el-dialog title="选择要查询的内容" :visible.sync="chnlSubMchIdQuery">
            <el-form :inline="true" class="demo-form-inline" :rules="rules">
                <!-- 下拉菜单 -->
                <el-select v-model="mchnt_tp" placeholder="请选择" prop="mchnt_tp">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="chnlSubMchIdQuery = false">取 消</el-button>
                    <el-button type="primary" @click="search">确 定</el-button>
                </div>
        </el-dialog>
        <!-- D0业务申请 -->
        <el-dialog title="请选择" :visible.sync="mchntOpenTZ">
            <el-form
                :inline="true"
                class="demo-form-inline"
                :rules="rules"
                ref="mchntOpenTZForm"
                :model="mchntOpenTZForm"
            >
                <el-form-item label="是否开通" prop="trans_zero_flag">
                    <el-select
                        v-model="mchntOpenTZForm.trans_zero_flag"
                        placeholder="请选择"
                        clearable
                        @change="mchntOpenTZForm.trans_zero_flag==1?rules.trans_zero_set_cd[0].required=true:rules.trans_zero_set_cd[0].required=false"
                    >
                        <el-option label="关闭" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="费率" prop="trans_zero_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="mchntOpenTZForm.trans_zero_set_cd"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到账方式" prop="trans_zero_arr_type">
                    <el-select
                        v-model="mchntOpenTZForm.trans_zero_arr_type"
                        placeholder="请选择"
                        clearable
                        @change="mchntOpenTZForm.trans_zero_arr_type==3?rules.month_free_count[0].required=true:rules.month_free_count[0].required=false"
                    >
                        <el-option label="自动到账" value="1"></el-option>
                        <el-option label="手动提现" value="2"></el-option>
                        <el-option label="D0钱包" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月免次数" prop="month_free_count">
                    <el-input v-model="mchntOpenTZForm.month_free_count"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mchntOpenTZ = false">取 消</el-button>
                <el-button type="primary" @click="searchMchntOpenTZ('mchntOpenTZForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 业务状态 -->
        <el-dialog title="要查询的内容" :visible.sync="mchntQueryTZ">
            <el-form :inline="true" class="demo-form-inline" :rules="rules">
                <el-form-item label="变更单号">
                    <el-input v-model="modify_no"></el-input>
                </el-form-item>
                <!-- 下拉菜单 -->
                <el-form-item label="变更类型">
                    <el-select v-model="modify_tp" placeholder="请选择">
                        <el-option
                            v-for="item in taps"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mchntQueryTZ = false">取 消</el-button>
                <el-button type="primary" @click="searchMchntQueryTZ">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 扫码预授权 -->
        <el-dialog title="请选择" :visible.sync="addBestPay">
            <el-form :inline="true" :rules="rules" :model="bestWayForm" ref="bestWayForm">
                <el-form-item label="是否开通预授权支付宝" prop="alipre_pay">
                    <el-select v-model="bestWayForm.alipre_pay" placeholder="请选择" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预授权支付宝扣率" prop="alipre_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="bestWayForm.alipre_set_cd"
                        placeholder="请选择"
                        :disabled="bestWayForm.alipre_pay==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否开通预授权微信" prop="wechatpre_pay">
                    <el-select v-model="bestWayForm.wechatpre_pay" placeholder="请选择" clearable>
                        <el-option label="不开通" value="0"></el-option>
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预授权微信扣率" prop="wechatpre_set_cd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="bestWayForm.wechatpre_set_cd"
                        placeholder="请选择"
                        :disabled="bestWayForm.wechatpre_pay==0?true:false"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addBestPay = false">取 消</el-button>
                <el-button type="primary" @click="searchAddBestPay('bestWayForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 翼支付 -->
        <el-dialog title="请选择" :visible.sync="bestPay">
            <el-form :inline="true" :rules="rules" :model="payForm" ref="payForm">
                <el-form-item label="开通" prop="bestPayOpen">
                    <el-select
                        v-model="payForm.bestPayOpen"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option label="开通" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="翼支付扣率" prop="bestPaySetCd">
                    <!-- 数据列表 -->
                    <el-select
                        filterable
                        v-model="payForm.bestPaySetCd"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in rate"
                            :key="item.deduction_rate_code"
                            :label="item.deduction_rate_code+'----'+item.deduction_rate_name"
                            :value="item.deduction_rate_code"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bestPay = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subBestPay('payForm')" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      funData: [
        {
          title: "微信认证",
          contain: "",
          handle: "查询"
        },
        {
          title: "商户渠道子商户号",
          contain: "",
          handle: "查询"
        },
        {
          title: "即时到账（D0）业务申请",
          contain: "",
          handle: "开通"
        },
        {
          title: "业务状态查询",
          contain: "",
          handle: "查询"
        },
        {
          title: "扫码预授权申请",
          contain: "",
          handle: "开通"
        },
        {
          title: "商户翼支付申请",
          contain: "",
          handle: "开通"
        }
      ],
      form: {},
      options: [
        {
          value: "1",
          label: "微信"
        },
        {
          value: "2",
          label: "支付宝"
        },
        {
          value: "3",
          label: "微信绿洲"
        },
        {
          value: "4",
          label: "支付宝蓝海"
        },
        {
          value: "5",
          label: "翼支付"
        },
        {
          value: "6",
          label: "银联二维码"
        }
      ],
      taps: [
        {
          value: "TZ",
          label: "D0业务"
        },
        {
          value: "YL",
          label: "银联二维码"
        },
        {
          value: "LA",
          label: "分账"
        },
        {
          value: "LZ",
          label: "绿洲业务"
        },
        {
          value: "PA",
          label: "扫码预授权"
        }
      ],
      mchnt_tp: "",
      chnlSubMchIdQuery: false,
      mchntQueryTZ: false,
      addBestPay: false,
      mchntOpenTZ: false,
      bestPay:false,
      modify_no: "",
      modify_tp: "",
      rate: "",
      //扫码预授权
      bestWayForm: {
        alipre_pay: "",
        alipre_set_cd: "",
        wechatpre_pay: "",
        wechatpre_set_cd: ""
      },
      //D0业务申请
      mchntOpenTZForm: {
        trans_zero_flag: "",
        trans_zero_arr_type: "",
        month_free_count: "",
        trans_zero_set_cd: ""
      },
      //翼支付
      payForm:{
          bestPayOpen:'',
          bestPaySetCd:''
      },
      rules: {
        alipre_pay: [{ required: true, message: " " }],
        wechatpre_pay: [{ required: true, message: " " }],
        modify_no: [{ required: true, message: " " }],
        trans_zero_flag: [{ required: true, message: " " }],
        trans_zero_arr_type: [{ required: true, message: " " }],
        trans_zero_set_cd: [{ required: false, message: " " }],
        month_free_count: [{ required: false, message: " " }],
        bestPayOpen: [{ required: true, message: " " }],
        bestPaySetCd: [{ required: true, message: " " }]
      }
    };
  },
  created() {
    let data = this.$route.query.data;
    this.form = data;
    let _this = this;
    //扣率
    this.$axios
      .get(url.getRate)
      .then(function(res) {
        _this.rate = res.data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    handleEdit(index, row) {
      let _this = this;
      //   console.log(index, row);
      if (index == 0) {
        //微信认证        
      let obj={
            mchnt_cd:this.form.mchnt_cd,
            ins_cd:this.form.ins_cd,
            trace_no:this.form.trace_no,
        }
        this.$axios.post(url.wxAuthQuery, obj).then(function(res) {
          _this.funData[0].contain = res.data.result_msg;
          console.log(res.data);
        });
      } else if (index == 1) {
        //打开嵌套的下拉菜单
        this.chnlSubMchIdQuery = true;
      } else if (index == 2) {
        //D0业务申请
        this.mchntOpenTZ = true;
      } else if (index == 3) {
        //业务状态查询
        this.mchntQueryTZ = true;
      } else if (index == 4) {
        this.addBestPay = true;
      } else if(index==5){
          this.bestPay = true;
      }
    },

    // 商户渠道子商户号查询
    search() {
      let _this = this;
      this.chnlSubMchIdQuery = false;
      let obj={
            mchnt_cd:this.form.mchnt_cd,
            ins_cd:this.form.ins_cd,
            trace_no:this.form.trace_no,
        }
      let data = Object.assign(obj, { mchnt_tp: _this.mchnt_tp });
      // console.log(data)
      this.$axios.post(url.chnlSubMchIdQuery, data).then(function(res) {
        if (res.data.return_code == "SUCCESS") {
          _this.funData[1].contain = res.data.result_msg;
        } else if (res.data.return_code == "FAIL") {
          _this.funData[1].contain = "系统异常";
        }
        // console.log(res.data);
      });
    },
    //D0业务申请
    searchMchntOpenTZ(formName) {
      let _this = this;
      let obj={
            mchnt_cd:this.form.mchnt_cd,
            ins_cd:this.form.ins_cd,
            trace_no:this.form.trace_no,
        }
      let data = Object.assign(obj, _this.mchntOpenTZForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url.mchntOpenTZ, data).then(function(res) {
            if (res.data.ret_code == "-1") {
              _this.funData[2].contain = "查询失败";
            } else if (res.data.ret_code == "9999") {
              _this.funData[2].contain = "系统异常";
            } else {
              _this.funData[2].contain = res.data.ret_msg;
            }
            _this.mchntOpenTZ = false;
          });
        } else {
          return false;
        }
      });
    },
    //业务状态查询
    searchMchntQueryTZ() {
      let _this = this;
      this.mchntQueryTZ = false;
      let data = Object.assign(
        _this.form,
        { modify_no: _this.modify_no },
        { modify_tp: _this.modify_tp }
      );
      // console.log(data)
      this.$axios.post(url.mchntQueryTZ, data).then(function(res) {
        if (res.data.ret_code == "-1") {
          _this.funData[3].contain = "查询失败";
        } else if (res.data.ret_code == "9999") {
          _this.funData[3].contain = "系统异常";
        } else {
          _this.funData[3].contain = res.data.ret_msg;
        }

        // console.log(res.data);
      });
    },
    //预授权开通
    searchAddBestPay(formName) {
      let _this = this;
      let obj={
            mchnt_cd:this.form.mchnt_cd,
            ins_cd:this.form.ins_cd,
            trace_no:this.form.trace_no,
        }
      let data = Object.assign(obj, _this.bestWayForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url.addBestPay, data).then(function(res) {
            _this.funData[4].contain = res.data.ret_msg;
            // console.log(res.data);
          });
          this.addBestPay = false;
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    //翼支付
    subBestPay(formName){
        let _this = this;
        let obj={
            mchntCd:this.form.mchnt_cd,
            insCd:this.form.ins_cd,
            traceNo:this.form.trace_no,
        }
        let data = Object.assign(obj, _this.payForm);
        this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url.bestPay, data).then(function(res) {
            _this.funData[5].contain = res.data.resultMsg;
            // console.log(res.data);
          });
          this.bestPay = false;
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    formList(data){
      console.log(data)
      this.form = data;
    }
  },
  beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.data =JSON.parse(to.query.data);
          vm.formList(vm.data);
        })
    },
};
</script>
<style scoped>
nav {
  width: 100%;
  background-color: #3f3e3e;
  height: 20px;
  display: flex;
  justify-content: space-between;
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
</style>

