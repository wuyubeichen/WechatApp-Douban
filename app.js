//app.js
App({

  //生命周期函数:用户首次打开小程序，触发 onLaunch（全局只触发一次）。
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }),


    //授权获取用户信息
    wx.getUserInfo({
      success: res => {
        console.log("getUserInfo:success");
        this.globalData.userInfo = res.userInfo
      },
      fail(error) {
        console.log(error);
        console.log("getUserInfo:fail");
      }
    })
  },

    /*

    wx.getSetting({
      success:res =>{
        if (res.authSetting['scope.userInfo']) {
          //记录已授权，且获取了用户信息
          this.haveAuthForUserInfo = true;
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          this.haveAuthForUserInfo = false;
        }
      }
    })



    //请求授权并获取用户微信信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //1.已经授权，可以直接调用getUserInfo获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          //2.提示用户开放授权,并获取用户信息
          console.log("提示授权");
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  console.log("请求授权成功！");
                  this.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            },
            fail() {
              console.log("请求授权失败！");
            }

          })
        }
      }
    })
    */



  //生命周期函数:小程序启动或者从后台进入前台显示，会触发onShow方法，监听小程序显示。
  onShow: function () {

  },

  //生命周期函数:小程序从前台进入后台，触发 onHide方法。
  onHide: function () {

  },

  //错误监听函数:当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function (msg) {
    console.log(msg)
  },

  globalData: {
    userInfo: null,
    haveAuthForUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    logInUserInfo: null,
    g_isPlayMusic: false,
    g_currentMusicArticalID: null,
  }
})


/*
代码暂存
  {
        "pagePath": "pages/Home/home",
        "iconPath": "Resources/Pictures/Tabbar/tabbar_icon_zixun_default.png",
        "selectedIconPath": "Resources/Pictures/Tabbar/tabbar_icon_zixun_selected.png",
        "text": "专家咨询"
  },

  
  {
        "pagePath": "pages/Bargainers/bargainers",
        "iconPath": "Resources/Pictures/Tabbar/tabbar_icon_kanjiashi_default.png",
        "selectedIconPath": "Resources/Pictures/Tabbar/tabbar_icon_kanjiashi_selected.png",
        "text": "二手房砍价师"
  },


   {
        "pagePath": "pages/BuyRead/buyread",
        "iconPath": "Resources/Pictures/Tabbar/tabbar_icon_gonglue_default.png",
        "selectedIconPath": "Resources/Pictures/Tabbar/tabbar_icon_gonglue_selected.png",
        "text": "买房必读"
      },
  {
        "pagePath": "pages/logs/logs",
        "iconPath": "Resources/Pictures/Tabbar/tabbar_icon_faxian_default.png",
        "selectedIconPath": "Resources/Pictures/Tabbar/tabbar_icon_faxiani_selected.png",
        "text": "程序日志"
      }

*/
