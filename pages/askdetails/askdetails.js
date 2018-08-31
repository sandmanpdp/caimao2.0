// pages/askdetails/askdetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    id : '',
    askdetail:''
  },
  setNavIndexFun:function(e){
    this.setData({
      navIndex: (e.currentTarget.id.split('n'))[1]
    })
  },
  getAskDetail : function () {
    var that = this;
    var id = that.data.id;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/QuizDetails?token='+app.union_id,
      data :{
        id : id
      },
      success (res) {
        var resData = res.data.data;
        var error = res.data.error;
        if(error == 0){
          that.setData({
            askdetail: resData[0]
          })
        }
        console.log(that.data.askdetail)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id : id
    });
    this.getAskDetail();
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