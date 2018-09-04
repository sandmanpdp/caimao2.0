// pages/ask/ask.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,  //导航下标
    maskState: false,  //是否显示遮罩,
    quizList :[],
    page : 1,//最新的
    finishPage:1,
    finishQuizList:[],
    finishNull : false,
    newNull : false
  },
  setNavIndexFun:function (e) { //导航选择
    this.setData({
      navIndex: (e.currentTarget.id.split('n'))[1]
    })
  },
  setMaskTrueFun: function (e) { //遮罩选择
    this.setData({
      maskState: true
    })
  },
  setMaskFalseFun: function (e) { //遮罩选择
    this.setData({
      maskState: false
    })
  },
  writeAskFun:function(){  //写问股方法
    wx.navigateTo({
      url: '/pages/askreward/askreward'
    })
  },
  detailsAskFun: function (e) {  //问股详情
  var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/askdetails/askdetails?id='+id
    })
  },

  getFinishQuiz : function () {
    var that = this;
    var finishPage = that.data.finishPage;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/list',
      data: {
        page: finishPage,
        size: 10,
        token: app.union_id,
        state: 1
      },
      success: function (res) {
        if (res.data.data == '') {
          var finishNull = true;
          that.setData({
            finishNull: finishNull
          })
        }
        if (res.data.page) {
          var page = res.data.page || '1'
        }
        that.setData({
          finishQuizList: res.data.data,
          finishPage: page
        })
      }
    })
  },

  getQuizList: function (state) {
    var that = this;
    var page = that.data.page;
    
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/list',
      data: {
        page: page,
        size: 4,
        token: app.union_id,
        state: state
      },
      success: function (res) {
        var resData = res.data.data;
        var quizList = that.data.quizList || [];
        for (var i = 0; i < resData.length; i++) {
          quizList.push(resData[i])
        }
        if (res.data.page) {
          var page = res.data.page || '1'
        }
        if (res.data.data.length < 10) {
          var newNull = true;
        }
        that.setData({
          quizList: quizList,
          page: page,
          newNull: newNull
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuizList('-1');
    this.getFinishQuiz();
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.navIndex == 0){
      this.getQuizList('-1');
    }else {
      this.getFinishQuiz('-1');
    }
    
  },

  //  转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '黑石笔记',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  } 
})