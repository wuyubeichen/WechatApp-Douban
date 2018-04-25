// pages/StudyFiles/MovieDetail/movieDetail.js
var doubanData = require("../../../Resources/Data/DoubanData.js");
var utilsTool = require("../../../utils/util.js");
//ES6引入类
import {Movie} from '../../../Class/Movie.js';

var globalData = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieID: "",
    movieDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取movieID
    let movieID = options.movieId;
    //console.log("movieID：" + movieID);
    // movieID = "4920389";
    //2.加载电影详情数据enableLocalData
    if (utilsTool.enableLocalData) {
      let data = doubanData.movieDetail;
      this.setData({
        movieDetail: utilsTool.doubanHandleMovieDetaiData(data)
      });
    } else {
      //第一种：普通方法加载电影详情
      var url = utilsTool.doubanUrl_subjectDetail + movieID;
      //utilsTool.HttpGet(url, null, this.callbackForMovieDetail);
      
      //第二种：ES6封装的对象来加载电影详情
      var movie = new Movie(url);
      //使用回调方法得到电影详情
      /*
      var that = this;
      movie.requireForMovieData(function(movie){
        that.setData({
          movieDetail: movie
        });
      });
      */
      //上述代码的改进：不使用that
      movie.requireForMovieData((movie) =>{
        this.setData({
          movieDetail: movie
        });
      });



    }
  },

  //网络请求电影详情的回调
  callbackForMovieDetail: function (resData) {
    console.log(resData);
    let handleData = utilsTool.doubanHandleMovieDetaiData(resData);
    this.setData({
      movieDetail: handleData
    });
  },

  //预览大图片
  onPreviewBigImage: function(e) {
    let imgUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      //current:可选参数，当前显示图片的链接，不填则默认为urls的第一张
      //urls：必须参数,需要预览的图片http链接列表,多个图片是左右滑动
      current: imgUrl,
      urls: [imgUrl, imgUrl] 
    })
  }
})