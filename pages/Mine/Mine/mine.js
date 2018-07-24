// pages/Mine/mine.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setionOneData: "",
    setionTwoData: "",
    userInfo: {},
    logInUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data1 = [{
      iconImage: "/Resources/Pictures/Mine/wd_qianbao_icon.png",
      title: "我的钱包"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_liquan_icon.png",
      title: "我的礼券"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_guanyu_icon.png",
      title: "我的关注"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_dingdan_icon.png",
      title: "我的订单"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_xiaoxi_icon.png",
      title: "我的消息"
    },];

    let data2 = [{
      iconImage: "/Resources/Pictures/Mine/wd_qinqi_icon.png",
      title: "成为专家"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_bangzhu_icon.png",
      title: "帮助和反馈"
    }, {
      iconImage: "/Resources/Pictures/Mine/wd_guanyu_icon.png",
      title: "关于亲戚买房"
    }];

    //本地是否有登录的信息
    var logInUserInfo = app.globalData.logInUserInfo;
    this.setData({
      setionOneData: data1,
      setionTwoData: data2,
      logInUserInfo: logInUserInfo
    });

    //获取微信授权信息
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })

/*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      //在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    */
  },


  //进入登录界面
  onLogInTap: function (e) {
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
    if(this.userInfo){
      return;
    }
    var that = this;
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.showModal({
            title: '授权提示',
            content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //点击确认，跳转进入设置界面选择是否开启授权
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userInfo"]) {
                      //判断开始了授权，获取用户信息
                      wx.getUserInfo({
                        success: function (res) {
                          var userInfo = res.userInfo;
                          app.globalData.userInfo = res.userInfo;
                          console.log("getUserInfo-success:" + userInfo);
                        }
                      })
                    }
                  }
                })

              }
            }

          })
        }
      }
    })
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