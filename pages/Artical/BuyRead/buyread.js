// pages/BuyRead/buyread.js
var buyReadData = require('../../../Resources/Data/BuyReadData.js')
var utilsTool = require("../../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articals:"",
    searchResult: {},
    container_show: true,
    searchPannel_show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articals: buyReadData.articals
    });

    wx.setStorageSync("userName", "zhoushuai")

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


  //1.可进入文章详情
  onAritcalClick:function(e){
    //传数组, 字典等复杂类型, 要先用 JSON.stringify()转成字符串传递.
    //即使是这样，如果JSon中网络链接的特殊符号也不能正确的解析，无语。。。
    //var articalItem = e.currentTarget.dataset.articalItem;
    //console.log("articalItem：" + articalItem);
    //var newArticalItem = JSON.stringify(articalItem);
    var articalID = e.currentTarget.dataset.articalId;
    console.log("articalID："+ articalID);

    wx.navigateTo({
      url: '../ArticalDetail/ArticalDetail?articalID=' + articalID
    })
  },


  //2.搜索功能
  onBindFocus: function () {
    console.log("onBindFocus。。。。");
    this.setData({
      container_show: false,
      searchPannel_show: true
    });
  },
  onCancelSearch: function () {
    this.setData({
      container_show: true,
      searchPannel_show: false,
      searchResult: {}
    });
  },

  onBindInput: function (event) {
    let currentDetail = event.detail.value;
    //console.log("onBindInput: " + currentDetail);
  },

  onBindConfirm: function (event) {
    let currentDetail = event.detail.value;
    console.log("onBindConfirm: " + currentDetail);
    if (utilsTool.enableLocalData) {
      let moviesData = doubanData.moreMoviesData;
      let handleMovies = utilsTool.doubanHandleMoviesData(moviesData);
      this.setData({
        searchResult: handleMovies
      });
    } else {
      var searchUrl = utilsTool.doubanUrl_searchMovie + "?q=" + currentDetail;
      this.loadMovieData(searchUrl, "searchResult");
    }

  },

  onBindBlur: function (event) {
    let currentDetail = event.detail.value;
    // console.log("onBindBlur: " + currentDetail);
  },

  //3.加载数据
  //从豆瓣加载数据
  loadMovieData: function (url, category) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      data: {},
      header: {
        'content_type': "appication/json"
      },
      success: function (res) {
        console.log(res.data);
        let movies = utilsTool.doubanHandleMoviesData(res.data);
        let categoryName = utilsTool.doubanGetMovieCategory(category);
        //更新本页面的数据源
        var readyData = {};
        readyData[category] = {
          categoryName: categoryName,
          movies: movies
        };
        that.setData(readyData);
        // let movies = readyData.movies; 
        // if(readyData.length ===0){
        //   wx.showToast({
        //     title: '搜索无结果，换个关键词试试吧'
        //   })
        // }
      },
      fail: function () {
        console.log("failed")
      }
    })
  },

  //从本地加载豆瓣数据
  loadLocalMoviceData(category) {
    var resData = "";
    var categoryName = "";
    if (category === "in_theaters") {
      categoryName = "正在热映";
      resData = doubanData.in_theatersData;
    }
    if (category === "coming_soon") {
      categoryName = "即将上映";
      resData = doubanData.coming_soonData;
    }
    if (category === "top250") {
      categoryName = "Top250";
      resData = doubanData.top250Data;
    }

    let movies = utilsTool.doubanHandleMoviesData(resData);
    //更新本页面的数据源
    var readyData = {};
    readyData[category] = {
      categoryName: categoryName,
      movies: movies
    };
    this.setData(readyData);
  },


})