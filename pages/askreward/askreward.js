// pages/reward/reward.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskIndex: 0, //遮罩下标
    sumIndex: 0, //金额下标
    sumValue: 20, //当前选中的金额值 
    sumOther: '其他金额', //其他金额页面显示
    sumOtherValue: 0, //其他金额值
    problemValue: null, //提问值
    sharesValue: null, //股票值
    oxValue: [], //指定牛人值
    matchingState: false, //股票提示
    showStockCodeArray: [], //股票代码
    matchingStockCodeArray: [],
    shareValue: '',
    shareCode: '',
    atniuren:false
  },
  setMaskIndexFun: function(e) { //遮罩选择
    this.setData({
      maskIndex: (e.currentTarget.id.split('m'))[1]
    })
  },
  setSumIndexFun: function(e) { //悬赏金额选择
    var a = (e.currentTarget.id.split('s'))[1]
    var b
    switch (a) {
      case '0':
        b = 20;
        break;
      case '1':
        b = 50;
        break;
      case '2':
        b = 88;
        break
    }
    this.setData({
      sumIndex: a,
      sumValue: b
    })
  },

  setOtherSumFun: function(e) { //其他金额确认
    var that = this
    var a = that.data.sumOtherValue
    this.setData({
      sumIndex: 3,
      sumValue: a,
      sumOther: a + '元宝',
      maskIndex: 0
    })
  },
  sumOtherDateChange: function(e) { // 其他金额获取
    this.setData({
      sumOtherValue: e.detail.value
    })
  },
  problemDateChange: function(e) { // 问题获取
    this.setData({
      problemValue: e.detail.value
    })
  },
  sharesDateChange: function(e) { // 关联股票获取
    this.setData({
      sharesValue: e.detail.value
    })
  },
  oxDateChange: function(e) { // 指定牛人获取
    this.setData({
      oxValue: e.detail.value
    })
  },

  // 股票获取方法
  bindKeyInput: function(e) {
    var a = e.detail.value;
    var b = this.data.matchingStockCodeArray;
    var c = [];
    var d = false;
    this.setData({
      shareValue: a
    })
    if (e.detail.cursor != 0) {
      for (var i = 0; i < b.length; i++) {
        if (c.length < 10) {

          if (b[i].searchName.indexOf(a) == 0 || b[i].searchName.indexOf(a.toUpperCase()) >= 7) {
            c.push(b[i])
            d = true
          }
        }
      }
    }
    this.setData({
      matchingState: d,
      showStockCodeArray: c,
      // shareValue: e
    })
  },

  //获取股票数据
  getStock: function() {
    var that = this;
    wx.request({
      url: 'https://share.romawaysz.com/static/upload/code.js',
      success: function(res) {
        var a = res.data
        var b = []
        for (var i = 0; i < a.length; i++) {
          var c = {
            name: a[i][3] + '(' + a[i][2] + ')',
            searchName: a[i][3] + '(' + a[i][2] + ')' + a[i][4],
            code: a[i][1]
          }
          b.push(c)
        }
        that.data.matchingStockCodeArray = b
      }
    })
  },

  // 选择匹配股票代码的方法
  setCodeFun: function(e) {
    console.log(e.currentTarget)
    var a = e.currentTarget.dataset.text
    var b = e.currentTarget.id
    this.setData({
      shareValue: a,
      shareCode: b
    })
  },
  shareMaskEnd: function() { //关闭股票代码遮罩
    var that = this
    if (that.data.shareValue != '') {
      setTimeout(function() {
        var a = that.data.showStockCodeArray
        var b = /[0-9]{6}\([0-9a-zA-Z\u2E80-\u9FFF]+\)/
        var c = that.data.shareValue
        var d = a[0].code
        if (c.match(b) != null) {
          if (a.length == 1) {
            that.data.shareCode = d
          }

          that.setData({
            matchingState: false
          })
        } else if (that.data.showStockCodeArray.length == 1) {
          that.setData({
            shareValue: that.data.showStockCodeArray[0].name,
            shareCode: that.data.showStockCodeArray[0].code,
            matchingState: false
          })

        } else {
          wx.showToast({
            title: '请输入正确的股票代码或名称',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          that.setData({
            shareValue: '',
            matchingState: false
          })
        }
      }, 500)
    }
  },
  //选择唯一的股票代码
  confirmShare: function() {
    if (this.data.showStockCodeArray.length == 1) {
      this.setData({
        shareValue: this.data.showStockCodeArray[0].name,
        shareCode: this.data.showStockCodeArray[0].code
      })
    }
  },

  submit: function() {
    var sumValue = this.data.sumValue;
    var problemValue = this.data.problemValue
    var shareCode = this.data.shareCode
    if (sumValue == '') {
      wx.showToast({
        title: '悬赏金额不能为空',
        icon: 'none'
      })
      return false
    } else if (problemValue == '') {
      wx.showToast({
        title: '提问内容不能为空',
        icon: 'none'
      })
      return false
    } else if (shareCode == '') {
      wx.showToast({
        title: '关联股票不能为空',
        icon: 'none'
      })
      return false
    }
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/add?token=' + app.union_id,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        price: sumValue,
        type: 1,
        content: problemValue,
        code: shareCode
      },
      success: function(res) {
        if (res.data.error == '0') {
          wx.showToast({
            title: '提问成功',
          })
          wx.navigateTo({
            url: '/pages/askdetail/askdetail?id='+res.data.data.id,
          })
        } else {
          wx.showToast({
            title: res.data.error + '错误',
          })
        }
        console.log(res);
      }
    })
  },

  /**
   * 生命周期
   * 函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStock();
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  //  转发
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '黑石笔记',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})