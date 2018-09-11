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
        if (res.data[3]) {
          that.setData({
            unReadSys: res.data[3].total,
            systemContent: '系统消息-' +res.data[3].content,
          })
        }else {
          that.setData({
            unReadSys : 0
          })
        }
        if (res.data[2]) {  //2笔记
          that.setData({
            unReadNote: res.data[2].total,
            noteContent: '笔记-' +res.data[2].content,
          })
        } else {
          that.setData({
            unReadNote: 0,
          })
        }
        if (res.data[1]) {  //1观点
          that.setData({
            unReadView: res.data[1].total,
            viewContent: '观点-' +res.data[1].content,
          })
        } else {
          that.setData({
            unReadView : 0
          })
        }
        if (res.data[6]) {
          that.setData({
            unReadAsk: res.data[6].total,
            askContent: '问股诊股-'+res.data[6].content
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