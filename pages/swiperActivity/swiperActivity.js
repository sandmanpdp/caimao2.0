// pages/swiperActivity/swiperActivity.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options : '',
    goto_url : ''
  },
  getUrl : function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/activity/Img',
      data : {
        token : app.union_id,
        site :0,
        id: that.data.options.id
      },
      success : function (res) {
        var resData = res.data.data[0];
        that.setData({
          goto_url: resData.goto_url
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    this.getUrl()
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