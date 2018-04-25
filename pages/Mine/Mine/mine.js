// pages/Mine/mine.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
   data: {
    setionOneData:"",
    setionTwoData:"",
    
    haveLoginUserInfo:false //是否已经登录
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    let data1 = [{
      iconImage:"/Resources/Pictures/Mine/wd_qianbao_icon.png",
      title:"我的钱包"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_liquan_icon.png",
      title:"我的礼券"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_guanyu_icon.png",
      title:"我的关注"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_dingdan_icon.png",
      title:"我的订单"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_xiaoxi_icon.png",
      title:"我的消息"
    }, ];

    let data2=[{
      iconImage:"/Resources/Pictures/Mine/wd_qinqi_icon.png",
      title:"成为专家"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_bangzhu_icon.png",
      title:"帮助和反馈"
    }, {
      iconImage:"/Resources/Pictures/Mine/wd_guanyu_icon.png",
      title:"关于亲戚买房"
    }];

    //本地是否有登录的信息
    var haveLogin = app.globalData.logInUserInfo;

    this.setData({
      setionOneData:data1,
      setionTwoData: data2,
      haveLoginUserInfo: haveLogin
    });

   },


  //进入登录界面
   onLogInTap:function(e){
     wx.navigateTo({
       url: '../../../pages/LogIn/LogIn/login'
     })
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
   onReady: function () {

   },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
      
   },

  /**
   * 生命周期函数--监听页面隐藏
   */
   onHide: function () {

   },

  /**
   * 生命周期函数--监听页面卸载
   */
   onUnload: function () {

   },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
   onPullDownRefresh: function () {

   },

  /**
   * 页面上拉触底事件的处理函数
   */
   onReachBottom: function () {

   },

  /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {

   }
 })