// pages/askme/askme.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: true, //导航下标
    page : 1,
    quizList:''
  },
  setNavIndexFun: function (e) { //导航下标设置
    var a;
    if (e.currentTarget.id == '0') {
      a = true
    } else {
      a = false
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
        if (res.data.page) {
          var page = res.data.page || '1'
        }
        that.setData({
          quizList: res.data.data,
          page: page
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyQuizList()
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
  
  }
})