<template>
    <div class="glo">
        <el-tabs type="border-card">
            <el-tab-pane label="公众号参数查询/单商户配置">
                <el-form
                    label-position="right"
                    :model="form"
                    label-width="180px"
                    ref="form"
                    size="mini"
                    :inline-message="true"
                >
                    <el-form-item label="商户号" prop="mchntCd">
                        <el-input v-model="form.mchntCd" placeholder="支持智能匹配"></el-input>
                        <el-button type="primary" @click="search('form')">查询</el-button>
                    </el-form-item>
                    <p>公众号参数配置说明</p>
                    <p>appid:支付调用的Appid。即子商户SubAPPID</p>
                    <p>subscribeAppid：交易后提示关注的Appid，即子商户推荐关注公众账号APPID</p>
                    <p>支付授权目录：需以“/”结尾，如http://wxpay.lcsw.cn</p>
                    <table border="1px" cellspacing="0" class="table" v-if="retCode=='0000'">
                        <tr>
                            <td>商户代码</td>
                            <td>{{form.mchntCd}}</td>
                        </tr>
                        <tr>
                            <td>渠道商户号</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>支付授权目录</td>
                            <td>
                                <el-button
                                    type="success"
                                    @click="dialogPay = true"
                                    size="mini"
                                >添加支付授权目录</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>用户APPID配置</td>
                            <td>
                                <el-button
                                    type="success"
                                    @click="dialogAppid = true"
                                    size="mini"
                                >添加appid</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>返回码</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>返回说明</td>
                            <td></td>
                        </tr>
                    </table>
                    <p v-if="retCode=='2005'" class="hasNo">无查询结果</p>
                </el-form>
                <el-dialog title="支付授权目录配置" :visible.sync="dialogPay">
                    <el-form :model="form">支付授权目录：
                        <el-select v-model="payValue" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-input
                            v-model="payInput"
                            clearable>
                        </el-input>
                        <el-button icon="el-icon-plus" circle size="mini" type="primary"></el-button>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogPay = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="dialogPay = false" size="mini">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="appid设置" :visible.sync="dialogAppid">
                    <el-form :model="form" :inline="true">
                        <el-col :span="11">
                        appid：
                          <el-input
                            v-model="appidInput"
                            clearable
                            size="mini">
                        </el-input>
                        </el-col>
                        <el-col :span="11">
                          推荐关注appid：<el-input
                              v-model="appidReco"
                              clearable
                              size="mini">
                          </el-input>
                        </el-col>
                        <el-col :span="2" >
                          <el-button icon="el-icon-plus" circle size="mini" type="primary"></el-button>
                        </el-col>
                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogAppid = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="dialogAppid = false" size="mini">确 定</el-button>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      form: {
        mchntCd: ""
      },
      dialogPay: false,
      dialogAppid: false,
      options: [{
          value: 'https://',
          label: 'https://'
        }, {
          value: 'http://',
          label: 'http://'
        }],
        payValue: '',
        payInput:'',
        appidInput:'',
        appidReco:'',
        retCode:'',
    };
  },
  methods: {
    search() {
      let data = {
        traceNo: "",
        agencyType: "",
        configs: [
          {
            mchntCd: this.form.mchntCd
          }
        ]
      };
      // console.log(url.wxSearch)
      let _this = this;
      this.$axios.post(url.wxSearch, data).then(function(res) {
        // console.log(res.data);
        _this.retCode = res.data.retCode
      });
    },
    handleClick() {
      alert("button click");
    }
  }
};
</script>
<style scoped>
.form_info {
  width: 100%;
}
input,
.el-input {
  width: 55%;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px;
}
p {
  font-size: 12px;
}
.el-tabs--border-card > .el-tabs__content,
.el-tabs--border-card,
.glo {
  height: 100%;
}
.table {
  margin-top: 50px;
  border-color: #dcdfe6;
  width: 60%;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
}
.table tr {
  height: 30px;
}
.table td {
  width: 50%;
}
.hasNo{
  color: #f56c6c;
  font-size: 16px;
  margin-top: 40px;
}
</style>
