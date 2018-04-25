// pages/ArticalDetail/ArticalDetail.js
var buyReadData = require('../../../Resources/Data/BuyReadData.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveCollectioned: false,
    artical: "",
    isPlayMusic: false

  },

  /**cla
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.使用JSON.parse解析数据
    //let artical = JSON.parse(options.articalItem);
    //这里本想通过json解析直接获取artical,但是因为json有关网络的特殊字符不能被解析。所以只好用articalID再次获取数据，瞬间感觉小程序好弱。。。
    let articalID = options.articalID;
    let index = parseInt(articalID.substring(4)) - 1;
    let artical = buyReadData.articals[index];

    //2.读取缓存中记录的文章被收藏状态‘
    var collectioned = false;//当前文章默认未收藏
    var collectionLog = wx.getStorageSync("collectionLog");
    if (collectionLog) {
      collectioned = collectionLog[articalID] ? collectionLog[articalID] : false;
    } else {
      collectionLog = {};
      collectionLog[articalID] = false;
      wx.setStorageSync("collectionLog", collectionLog)
    }

    //3.更新音乐播放状态
    //从globalData中获取当前播放器状态和正在播放的ID
    var isPlayMusic = false;
    if (app.globalData.g_isPlayMusic && app.globalData.g_currentMusicArticalID === articalID) {
      isPlayMusic = app.globalData.g_isPlayMusic;
    }

    //3.设置播放或者暂停的操作
    this.setMusicMonitor();

    //4.更新初始数据:文章、是否被收藏，是否在播放中
    this.setData({
      artical: artical,
      haveCollectioned: collectioned,
      isPlayMusic: isPlayMusic
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

  },



  //------------自定义方法-------------
  //1.暂停或者播放音乐
  onMusicTap: function (event) {
    if (this.data.isPlayMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.artical.musicLink,
        title: this.data.artical.musicName,
        coverImgUrl: this.data.artical.musicCvoer
      });
      this.setData({
        isPlayMusic: true
      });
    }
  },

  //2.点击收藏按钮
  onCollectionTap: function (event) {
    var collectionLog = wx.getStorageSync("collectionLog");
    var collectioned = collectionLog[this.data.artical.articalID];
    collectioned = !collectioned;
    collectionLog[this.data.artical.articalID] = collectioned;
    //1.测试Toast的使用
    //this.showToast(collectionLog, collectioned);
    //2.测试Model的使用
    this.showModel(collectionLog, collectioned);
  },



  //3.点击分享按钮
  onShareTap: function (event) {
    var itemList = ["分享给微信好友", "分享到微信盆友圈", "分享给QQ好友", "分享到QQ空间"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        wx.showModal({
          title: "分享文章",
          content: "您即将把文章" + itemList[res.tapIndex] + "，这里的功能还没有完善哦！"
        });
      }
    })
  },

  //私有方法
  showToast: function (collectionLog, collectioned) {
    wx.setStorageSync("collectionLog", collectionLog);
    this.setData({
      haveCollectioned: collectioned
    });
    wx.showToast({
      title: collectioned ? '收藏成功' : "取消收藏成功",
      duration: 1000,
      icon: "success"
    });
  },

  showModel: function (collectionLog, collectioned) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: collectioned ? '是否收藏文章' : "取消收藏文章",
      showCancel: true,
      cancelText: collectioned ? "不收藏" : "放弃操作",
      cancelColor: "#f42c28",
      configText: collectioned ? "收藏" : "确定取消",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("collectionLog", collectionLog)
          that.setData({
            haveCollectioned: collectioned
          });
        }
      }
    });
  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayMusic: false
      });
      app.globalData.g_isPlayMusic = false;
      app.globalData.g_currentMusicArticalID = null;
    });

    wx.onBackgroundAudioPlay(function () {
      // if (app.globalData.g_currentMusicArticalID ==that.data.artical.articalID){
        that.setData({
          isPlayMusic: true
        });
        app.globalData.g_isPlayMusic = true;
        app.globalData.g_currentMusicArticalID = that.data.artical.articalID;
      // }
    });

    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayMusic:false
      });
      app.globalData.g_isPlayMusic = false;
      app.globalData.g_currentMusicArticalID = null;
    });
  }

})