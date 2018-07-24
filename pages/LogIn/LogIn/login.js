// pages/LogIn/Login/login.js
var utilsTool = require("../../../utils/util.js");
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    needAccountLoginView:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });


    /*
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
          that.checkSettingStatu();
        },
        fail: function () {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用该小程序功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            showCancel: false,
            success: function (resbtn) {
              if (resbtn.confirm) {
                wx.openSetting({
                  success: function success(resopen) {
                    //  获取用户数据
                    that.checkSettingStatu();
                  }
                });
              }
            }
          })
        }
      })
    }
  */
  },




  //选择微信或者账号登录
  weixinLoginTap:function(e){
    //1.使用微信longin方法获取临时登录凭证
    wx.login({
      success:res=>{
        let code = res.code;
        if(code){
        //2.将登录凭证发送自己app的服务端
        //并在你的服务端使用该凭证向微信服务器换取
        //该微信用户的唯一标识(openid)和会话密钥(session_key)
        /*
          wx.request({
            url: '自己服务器提供的api',
            data: { code: code }
          })
        */
        }else{
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  accountLoginTap:function(e){
    this.setData({
      needAccountLoginView:true
    });
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
    that.setData({
      needAccountLoginView:false     
    });
    this.checkAuthoForUserInfo();
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