// pages/askdetails/askdetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    id : '',
    askdetail:'',
    comment:'',
    commentNext : '-1',
    commentList:''
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

  getComment : function (e) {
    var comment = e.detail.value;
    console.log(comment)
    this.setData({
      comment: comment
    })
  },

  addComment:function () {
    var that = this;
    if(that.data.comment != ''){
      wx.request({
        url: 'https://zhitouapi.romawaysz.com/comment/create',
        data: {
          token: app.union_id,
          type: 3,
          id: that.data.id,
          content: that.data.comment,
        },
        success : function (res) {
          if(res.data.error == 0) {
            wx.showToast({
              title: '回答成功',
            })
            that.getCommetList();
          }
        }
      }) 
    }else{
      wx.showToast({
        title: '回答内容不能为空',
        icon : 'none'
      })
    }
  },

  getCommetList: function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/comment/list',
      data : {
        token : app.union_id,
        type : 3,
        id : that.data.id,
        next : that.data.commentNext,
        size: 10,
      },
      success : function(res) {
        that.setData({
          commentList : res.data.data
        })
      }
    })
  },
  //点赞
  createPraise : function (e) {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/praise/create',
      data: {
        token : app.union_id,
        user_id: app.localUserData.user_id,
        type : 3,
        sId : e.currentTarget.dataset.id
      },
      success : function(res) {
        if(res.data.error == 0){
          wx.showToast({
            title: '点赞成功',
          })
          that.getCommetList();
        } else if (res.data.error == 10200){
          wx.showToast({
            title: '请勿重复点赞',
          })
        }else{
          wx.showToast({
            title: '错误' + res.data.error,
          })
        }
      },
    })
  },
  //采纳答案
  setSatistyAnswer : function (e) {
    var that = this;
    var aid = e.currentTarget.dataset.aid;
    console.log(aid);
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/set',
      data : {
        token : app.union_id,
        id : that.data.id,
        c_id : aid
      },
      success : function (res) {
        var resData = res.data.data;
        var error = res.data.error;
        if(error == 0) {
          wx.showToast({
            title: '采纳答案成功',
          })
        }
      }
    })
  },
  //获取满意答案
  getSatistyAnswer : function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/SatisfyAnswer',
      data : {
        token : app.union_id,
        id : that.data.id
      },
      success:function (res) {
        var resData = res.data.data;
        console.log(resData);
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
    this.getCommetList();
    this.getSatistyAnswer();
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