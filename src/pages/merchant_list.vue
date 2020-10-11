<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="商户列表">
                <el-table :data="merchantList" style="width: 100%,height:80%">
                    <el-table-column label="ID" prop="id" min-width="20%"></el-table-column>
                    <!-- <el-table-column label="机构号" prop="ins_cd" min-width="30%"></el-table-column> -->
                    <el-table-column label="商户名" prop="mchnt_name" min-width="30%"></el-table-column>
                    <el-table-column label="商户号" prop="fy_mchnt_cd" min-width="30%"></el-table-column>
                    <el-table-column align="right" >
                        <template slot="header" slot-scope="scope">
                            <el-button size="mini" type="success" @click="goAdd">添加</el-button>
                        </template>
                        <template slot-scope="scope">
                          <el-button
                                size="mini"
                                type="primiry"
                                @click="attachConfirm(scope.$index, scope.row)"
                            >提交审核</el-button>
                            <el-button
                                size="mini"
                                type="primiry"
                                @click="handleEdit(scope.$index, scope.row)"
                            >查看</el-button>
                            <el-button
                                size="mini"
                                type="primiry"
                                @click="fun(scope.$index, scope.row)"
                            >功能</el-button>
                            <el-button
                                size="mini"
                                type="primiry"
                                @click="mchnModify(scope.$index, scope.row)"
                            >修改</el-button>
                             <el-button
                                size="mini"
                                type="primiry"
                                @click="generate(scope.$index, scope.row)"
                            >生成协议</el-button>
                            <el-button
                                size="mini"
                                type="primiry"
                                @click="enModify(scope.$index, scope.row)"
                            >入账信息修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import url from "../serviceAPI.config.js";
export default {
  data() {
    return {
      merchantList: [],
      info: []
    };
  },
  created() {
    let _this = this;
    //获取信息列表
    this.$axios
      .get(url.getList, {})
      .then(function(res) {
        _this.merchantList = res.data.data;
        console.log(res.data.data);
      })
      .catch(function(error) {
        // console.log(error);
      });
  },
  methods: {
    goAdd() {
      this.$router.push("/merchantApply");
    },
    //提交审核
    attachConfirm(index,row){
      let data = {
        mchnt_cd: row.fy_mchnt_cd,
        ins_cd: row.ins_cd,
        trace_no: row.trace_no,
      };
      this.$axios.get(url.attachConfirm,{params:data}).then(res=>{
        console.log(res)
      })
    },
    //商户信息查询
    handleEdit(index, row) {
        let data = {
        mchntCd: row.fy_mchnt_cd,
        insCd: row.ins_cd,
        traceNo: row.trace_no,
      };
      // console.log(data)
      this.$router.push({
        name: "MerchantInfo",
        query: {
          data:JSON.stringify(data)
        }
      });
    },
    //功能
    fun(index,row){
      let data = {
        mchnt_cd: row.fy_mchnt_cd,
        ins_cd: row.ins_cd,
        trace_no: row.trace_no,
      };
      // console.log(data)
      this.$router.push({
        path:'/functionList',
        query:{
          data:JSON.stringify(data)
        }
      })
    },
    //商户信息修改
    mchnModify(index, row) {
      let data = {
        fy_mchnt_cd: row.fy_mchnt_cd,
        mchnt_name: row.mchnt_name,
        trace_no: row.trace_no
      };
      // console.log(data);
      this.$router.push({
        path: "/merchantModify",
        query: {
          data
        }
      });
    },
    //入账信息修改
    enModify(index, row) {
      let data = {
        fy_mchnt_cd: row.fy_mchnt_cd,
        mchnt_name: row.mchnt_name,
        trace_no: row.trace_no
      };
      // console.log(data);
      this.$router.push({
        path: "/entryModify",
        query: {
          data
        }
      });
    },
    //生成协议
    generate(index,row){
       let data = {
        ins_cd: row.ins_cd,
        mchnt_cd: row.fy_mchnt_cd,
        trace_no: row.trace_no
      };
      // console.log(data)
      this.$router.push({
        path: "/generate",
        query: {
          data
        }
      });
    }
  },
};
</script>
<style scoped>
.el-table{
  min-height: 700px;
}
</style>
