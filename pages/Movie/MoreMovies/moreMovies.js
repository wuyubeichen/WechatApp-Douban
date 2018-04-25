// pages/StudyFiles/MoreMovies/moreMovies.js
var doubanData = require("../../../Resources/Data/DoubanData.js");
var utilsTool = require("../../../utils/util.js");
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: "",
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取电影类型
    var categoryName = options.categoryName;
    // console.log(categoryName);

    //2.更新导航栏标题
    //旧版本不可以在这里设置标题，需要在onready中设置
    //当前版本已经改进
    wx.setNavigationBarTitle({
      title: categoryName
    });

    //3.区别类型，加载列表数据
    if (utilsTool.enableLocalData) {
      //使用本地数据
      let moviesData = doubanData.moreMoviesData;
      let handleMovies = utilsTool.doubanHandleMoviesData(moviesData);
      this.setData({
        movies: handleMovies
      });
    } else {
      //使用网络数据
      var url = "";
      switch (categoryName) {
        case "正在热映":
          url = utilsTool.doubanUrl_in_theaters;
          break;
        case "即将上映":
          url = utilsTool.doubanUrl_coming_soon;
          break;
        case "Top250":
          url = utilsTool.doubanUrl_top250;
          break;
      }
      this.data.requestUrl = url;
      //开启网络请求，并显示加载Loading
      wx.showNavigationBarLoading();
      utilsTool.HttpGet(url, null, this.callbackForMoreMovieData)
    }
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // console.log("下拉刷新");
    wx.showNavigationBarLoading();
    if (utilsTool.enableLcoalData){
      var that = this;
      setTimeout(function () {
        that.data.movies = [];
        that.addMoreMovies();
        wx.hideNavigationBarLoading();
      }, 1500);
    }else{
      let newUrl = this.data.requestUrl +"?start=0&count=20";
      this.data.movies =[];
      utilsTool.HttpGet(newUrl, null, this.callbackForMoreMovieData);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log("上拉加载更多")
    wx.showNavigationBarLoading();
    if (utilsTool.enableLocalData) {
      var that = this;
      setTimeout(function () {
        that.addMoreMovies();
        wx.hideNavigationBarLoading();
      }, 1500);
    }else{
      let newUrl = this.data.requestUrl + "?start=" + this.data.movies.length + "&count=20";
      utilsTool.HttpGet(newUrl, null, this.callbackForMoreMovieData);
    }
  },

 
  //加载本地数据
  addMoreMovies: function () {
    let moviesData = doubanData.moreMoviesData;
    let handleMovies = utilsTool.doubanHandleMoviesData(moviesData);
    //添加新数据，然后更新数据源
    let totoalMovies = this.data.movies.concat(handleMovies);
    this.setData({
      movies: totoalMovies
    });
  },

  //加载网络数据的回调
  callbackForMoreMovieData:function(resData){
    let movies = utilsTool.doubanHandleMoviesData(resData);
    console.log(movies);
    let newMoives = this.data.movies.concat(movies);
    this.setData({
      movies: newMoives
    });
    wx.hideNavigationBarLoading();
    if(movies.length == 0){
      wx.showToast({
        title: '没有更多数据啦，亲！',
        icon: "none"
      })
    }
  },

  //进入电影详情界面
  onMovieTap: function (event) {
    let movieId = event.currentTarget.dataset.movieId;
    // console.log("movieId：" + movieId);
    wx.navigateTo({
      url: '../MovieDetail/movieDetail?movieId=' + movieId
    })
  }
})