// pages/newsList/newsList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherNew :'',
    unReadView:'',
    unReadNote :'',
    unReadSys:'',
    unReadAsk :'',
  },
  getNews: function(e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/news/news?type=' + type,
    })
  },
  getUnreadFun : function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/msg/unreadNum',
      data: {
        token: app.union_id,
        type : 0
      },
      success: function (res) {
        console.log(res.data[1].total)
        that.setData({
          otherNew: res.data,
          unReadView: res.data[1].total,
          unReadNote: res.data[2].total,
          unReadSys: res.data[3].total,
          unReadAsk: res.data[6].total,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUnreadFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUnreadFun()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})