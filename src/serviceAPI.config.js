const BASEURL = '/api'
const URL = {
    //登录
    getlogin : BASEURL + '/Merchant/login',
    //三级联动-省
    getProvince : BASEURL + '/Merchant/province',
    //三级联动-市
    getCity : BASEURL + '/Merchant/city',
    // 三级联动-县
    getCounty : BASEURL + '/Merchant/county',
    //表单提交
    submitForm : BASEURL + '/Merchant/wxMchntAdd',
    //扣率
    getRate : BASEURL + '/Merchant/rate',
    //天天结扣率
    getRated : BASEURL + '/Merchant/rate_d',
    //行别
    bankType : BASEURL + '/Merchant/bank',
    //商户信息列表
    getList : BASEURL + '/Merchant/index',
    //查询商户信息
    searchMchnList : BASEURL + '/jinjian/getMchntInfAndConfig',
    //商户信息修改
    modifyMchnList : BASEURL + '/Merchant/wxMchntUpd',
    //入账信息修改
    modifyEnList : BASEURL + '/Merchant/mchntAcntUpd',
    //微信参数接口查询
    wxSearch : BASEURL + '/jinjian/xyWechatConfigGet',
    //微信认证
    wxAuthQuery : BASEURL + '/jinjian/wxAuthQuery',
    //商户渠道子商户号查询接口
    chnlSubMchIdQuery : BASEURL + '/jinjian/chnlSubMchIdQuery',
    //业务状态查询
    mchntQueryTZ : BASEURL + '/jinjian/mchntQueryTZ',
    //扫码预授权
    addBestPay : BASEURL + '/jinjian/wxMchntAddScanPrePay',
    //D0业务申请
    mchntOpenTZ : BASEURL + '/jinjian/mchntOpenTZ',
    //翼支付申请
    bestPay : BASEURL + '/jinjian/addBestPay',
    //电子协议生成
    generate : BASEURL + '/jinjian/elecContractGenerate', 
    //协议签署
    sign : BASEURL + '/jinjian/elecContractSign',
    //图片上传
    uploadPic : BASEURL + '/Merchant/uploadPic',  
    //联行号 
    bankMes : BASEURL + '/Merchant/bank_message',   
    //业务A 
    category : BASEURL + '/Merchant/category',   
    //业务B
    cate : BASEURL + '/Merchant/cate',    
    //提交审核
    attachConfirm : BASEURL + '/jinjian/attachConfirm',   
    
}

module.exports = URL