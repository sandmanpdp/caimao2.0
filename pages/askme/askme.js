// pages/askme/askme.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: '0', //导航下标
    page : 1,
    quizList:[],
    answerList:[],
    answerPage : 1
  },
  setNavIndexFun: function (e) { //导航下标设置
    var a;
    if (e.currentTarget.id == '0') {
      a = '0'
    } else {
      a = '1'
    }
    this.setData({
      navIndex:a
    })
  },
  
  detailsAskFun: function (e) {  //问股详情
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/askdetails/askdetails?id=' + id
    })
  },

  getMyQuizList: function () {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/list',
      data: {
        page: page,
        size: 10,
        token: app.union_id,
        user_id: app.localUserData.user_id
      },
      success: function (res) {
        console.log(res.data.data);
        var resData = res.data.data;
        var error = res.data.error;
        if (res.data.page) {
          var page = res.data.page || '1'
        }
        if (error == 0 && resData !=''){
          var quizList = that.data.quizList || [];
          for (var i = 0; i < resData.length; i++) {
            quizList.push(resData[i])
          }
          var newQuizList = quizList.map(function(item){
            item.resDay = app.getRestTime(item.created_at,item.limit_date);
            return item;
          })

          that.setData({
            quizList: newQuizList,
            page: page
          })
        }
      }
    })
  },
  getAnswerQuiz : function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/AnswerQuiz',
      data :{
        page: that.data.answerPage,
        size : 10,
        token : app.union_id
      },
      success : function (res) {
        var resData = res.data.data
        var error = res.data.error;
        var answerList = that.data.answerList || [];
        if(error == 0 ){
          for (var i = 0; i < resData.length; i++) {
            answerList.push(resData[i])
          }
          // var newAnswerList = answerList.map(function(item){
          //   item.resDay = app.getRestTime(item.created_at,item.limit_date);
          //   return item
          // })

          that.setData({
            answerList: answerList,
            answerPage : res.data.page
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyQuizList();
    this.getAnswerQuiz();
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
    var navIndex = this.data.navIndex;
    if (navIndex == 0){
      this.getMyQuizList();
    }else {
      this.getAnswerQuiz();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})