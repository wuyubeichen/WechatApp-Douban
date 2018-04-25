var utilsTool = require("../utils/util.js");

class Movie{
  //构造器
  constructor(url){
    this.url = url;
  }

  //方法不需要加function标识
  requireForMovieData(callback){
    this.callback = callback;
    utilsTool.HttpGet(this.url, null, this.handleMovieData.bind(this));
  }
  
  //异步得到数据之后，回调传回给界面
  handleMovieData(data){
    let movie = utilsTool.doubanHandleMovieDetaiData(data);
    this.callback(movie);
  }

}

export {Movie}