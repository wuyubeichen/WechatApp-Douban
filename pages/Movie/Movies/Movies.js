// pages/StudyFiles/Movies/Movies.js
var doubanData = require("../../../Resources/Data/DoubanData.js");
var utilsTool = require("../../../utils/util.js");
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    in_theaters: {},
    coming_soon: {},
    top250: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    if (utilsTool.enableLocalData) {
      //豆瓣已经对开放接口做了限制无法访问，所以这里可以选择使用本地数据演示
      this.loadLocalMoviceData("in_theaters");
      this.loadLocalMoviceData("coming_soon");
      this.loadLocalMoviceData("top250");
    } else {
      //使用网络数据
      let in_theaters = utilsTool.doubanUrl_in_theaters + "?start=0&count=7";
      let coming_soon = utilsTool.doubanUrl_coming_soon + "?start=0&count=7";
      let top250 = utilsTool.doubanUrl_top250 + "?start=0&count=7";
      this.loadMovieData(in_theaters, "in_theaters");
      this.loadMovieData(coming_soon, "coming_soon");
      this.loadMovieData(top250, "top250");
    }
  },

  //加载网络豆瓣数据
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
      },
      fail: function () {
        console.log("failed")
      }
    })
  },

  //加载本地豆瓣数据
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

  //点击更多
  onMoreTap: function (event) {
    var categoryName = event.currentTarget.dataset.categoryName;
    console.log(categoryName);
    wx.navigateTo({
      url: '../MoreMovies/moreMovies?categoryName=' + categoryName
    })
  },

  //点击进入电影搜索界面
  onSearchViweTap:function(event){
    wx.navigateTo({
      url: '../MovieSearch/movieSearch',
    })
  },

  //点击进入电影详情
  onMovieTap: function (event) {
    let movieId = event.currentTarget.dataset.movieId;
    // console.log("movieId：" + movieId);
    wx.navigateTo({
      url: '../MovieDetail/movieDetail?movieId=' + movieId
    })
  }

})





