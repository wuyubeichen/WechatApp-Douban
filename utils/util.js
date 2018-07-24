const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//判断是否为空对象
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}


//豆瓣界面的相关方法
//1.转为星星数量为数组
function doubanConverStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

//2.精简电影数据
function doubanHandleMoviesData(movicesData) {
  var movies = [];
  for (var index in movicesData.subjects) {
    var subject = movicesData.subjects[index];
    var title = subject.title.length >= 6 ? subject.title.substring(0,6) + "..." : subject.title;
    var stars = this.doubanConverStarsArray(subject.rating.stars);
    var handledSubject = {
      stars: stars,
      title: title,
      average: subject.rating.average,
      coverImage: subject.images.large,
      movieId: subject.id
    }
    movies.push(handledSubject);
  }
  this.movieIndex = this.movieIndex + 1;
  return movies;
}

//3.处理演员名字字符串
function doubanConvertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

//4.演员信息
function doubanConvertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

//5.获取电影类型
function doubanGetMovieCategory(category) {
  var categoryName = "";
  if (category === "in_theaters") {
    categoryName = "正在热映";
  }
  if (category === "coming_soon") {
    categoryName = "即将上映";
  }
  if (category === "top250") {
    categoryName = "Top250";
  }
  if(category ==="US_box"){
    categoryName = "北美票房榜"
  }
  return categoryName;
}

//6.处理电影详情信息
function doubanHandleMovieDetaiData(data){
  if (!data) {
    return {};
  }
  var director = {
    avatar: "",
    name: "",
    id: ""
  }
  if (data.directors[0] != null) {
    if (data.directors[0].avatars != null) {
      director.avatar = data.directors[0].avatars.large

    }
    director.name = data.directors[0].name;
    director.id = data.directors[0].id;
  }
  var movie = {
    movieImg: data.images ? data.images.large : "",
    country: data.countries[0],
    title: data.title,
    originalTitle: data.original_title,
    wishCount: data.wish_count,
    commentCount: data.comments_count,
    year: data.year,
    generes: data.genres.join("、"),
    stars: this.doubanConverStarsArray(data.rating.stars),
    average: data.rating.average,
    director: director,
    casts: this.doubanConvertToCastString(data.casts),
    castsInfo: this.doubanConvertToCastInfos(data.casts),
    summary: data.summary
  }
  return movie;
}


// 检测授权状态
function checkAuthForUserInfo(cb) {
  var that = this;
  // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
  wx.getSetting({
    success: function success(res) {
      console.log(res.authSetting);
      var authSetting = res.authSetting;
      if (this.isEmptyObject(authSetting)) {
        console.log('首次授权');
      } else {
        console.log('不是第一次授权', authSetting);
        //没有授权的提醒
        if (authSetting['scope.userInfo'] === false) {
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用阅读记录功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.openSetting({
                  success: function success(res) {
                    console.log('openSetting success', res.authSetting);
                  }
                });
              }
            }
          })
        }
      }
    }
  });
}




//网络请求：GET
function HttpGet(url, data, callBack) {
  /*
  wx.showToast({
    //title: '开始网络请求...',
    //icon: "loading",
    duration: 10000
  })
  */
  wx.request({
    url: url,
    method: "GET",
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },

    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      consol.log("网络请求失败：" + url);
      consol.log(error);
    }
  })
}

//网络请求：Post
function HttpPost(url, data, callBack) {
  /*
  wx.showToast({
    title: '开始网络请求...',
    icon: "loading",
    duration: 10000
  })
 */
  if (!data) {
    data = {};
  }
  wx.request({
    url: getApp().globalData.appConfig.api_base + url,
    method: "POST",
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },

    success: function (res) {
      callBack(res.data);
    },
    fail: function () {
      consol.log(error);
    }
  })
}



//关于网络
//控制：使用本地和网络的数据
var enableLocalData = false; 

//豆瓣接口：
//1.豆瓣baseUrl
//doubanBaseUrl:"https://api.douban.com"
//2.由于豆瓣api的限制，这使用新的替代接口
var doubanBaseUrl = "http://t.yushu.im";
//3.正在热播
var doubanUrl_in_theaters = doubanBaseUrl + "/v2/movie/in_theaters";
//4.即将上映
var doubanUrl_coming_soon = doubanBaseUrl + "/v2/movie/coming_soon";
//5.Top50
var doubanUrl_top250 = doubanBaseUrl + "/v2/movie/top250";
//6.电影详情，使用示例：GET /v2/movie/subject/1764796
var doubanUrl_subjectDetail= doubanBaseUrl + "/v2/movie/subject/";
//7.搜索电影，使用示例：GET /v2/movie/search?q=张艺谋
var doubanUrl_searchMovie = doubanBaseUrl + "/v2/movie/search";
//8.北美票房榜
var doubanUrl_us_box = doubanBaseUrl + "/v2/movie/ us_box";



module.exports = {
  //共用方法
  formatTime: formatTime,
  HttpPost: HttpPost,
  HttpGet: HttpGet,
  isEmptyObject: isEmptyObject,

  //控制是否使用本地数据
  enableLocalData: enableLocalData,

  //豆瓣接口
  doubanBaseUrl: doubanBaseUrl,
  doubanUrl_in_theaters: doubanUrl_in_theaters,
  doubanUrl_coming_soon: doubanUrl_coming_soon,
  doubanUrl_top250: doubanUrl_top250,
  doubanUrl_subjectDetail: doubanUrl_subjectDetail,
  doubanUrl_us_box: doubanUrl_us_box,

  //豆瓣app的共用方法
  doubanConverStarsArray: doubanConverStarsArray,
  doubanHandleMoviesData: doubanHandleMoviesData,
  doubanConvertToCastString: doubanConvertToCastString,
  doubanConvertToCastInfos: doubanConvertToCastInfos,
  doubanGetMovieCategory: doubanGetMovieCategory,
  doubanHandleMovieDetaiData: doubanHandleMovieDetaiData,
  doubanUrl_searchMovie: doubanUrl_searchMovie
}





