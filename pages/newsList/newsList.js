// pages/newsList/newsList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherNew: '',
    unReadView: 0,
    unReadNote: 0,
    unReadSys: 0,
    unReadAsk: 0,
    noteContent: '',
    viewContent: '',
    askContent: '',
    systemContent: ''
  },
  getNews: function(e) {
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/news/news?type=' + type,
    })
  },
  getUnreadFun: function() {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/msg/unreadNum',
      data: {
        token: app.union_id,
        type: 0
      },
      success: function(res) {
        if (res.data.system) {
          that.setData({
            unReadSys: res.data.system.total,
            systemContent: '系统消息-' + res.data.system.content,
          })
        }else {
          that.setData({
            unReadSys : 0
          })
        }
        if (res.data.note) {  //2笔记
          that.setData({
            unReadNote: res.data.note.total,
            noteContent: '笔记-' + res.data.note.content,
          })
        } else {
          that.setData({
            unReadNote: 0,
          })
        }
        if (res.data.view) {  //1观点
          that.setData({
            unReadView: res.data.view.total,
            viewContent: '观点-' + res.data.view.content,
          })
        } else {
          that.setData({
            unReadView : 0
          })
        }
        if (res.data.quiz) {
          that.setData({
            unReadAsk: res.data.quiz.total,
            askContent: '问股诊股-' + res.data.quiz.content
          })
        } else {
          that.setData({
            unReadAsk : 0
          })
        }
        that.setData({
          otherNew: res.data,
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
    this.getUnreadFun();
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
    this.getUnreadFun();
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