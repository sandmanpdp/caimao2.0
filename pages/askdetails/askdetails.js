// pages/askdetails/askdetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 0,
    id: '',
    askdetail: '',
    comment: '',
    commentNext: '-1',
    commentList: '',
    userId: '',
    hasSatistyAnswer: false,
    askdetail_userId: '',
    restDay: '',
    isfocus: false,
    noComment: true,
    satistyAnswer: "",
    askStatus: '',
    isShowMask: false,
    satistyAnswerId: ''
  },
  setNavIndexFun: function(e) {
    this.setData({
      navIndex: (e.currentTarget.id.split('n'))[1],
    })
    if (this.data.navIndex == 0 && this.data.commentList.length == 0) {
      this.setData({
        noComment: true
      })
    } else if (this.data.navIndex == 1 && this.data.satistyAnswer.length == 0) {
      this.setData({
        noComment: true
      })
    } else {
      this.setData({
        noComment: false
      })
    }
    // if (this.data.navIndex == 1){
    //   this.getSatistyAnswer();
    // }


  },

  setInputFocus: function() {
    this.setData({
      isfocus: true
    })
  },

  getAskDetail: function() {
    var that = this;
    var id = that.data.id;
    var nowDate = new Date();
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/QuizDetails?token=' + app.union_id,
      data: {
        id: id
      },
      success(res) {
        var resData = res.data.data;
        var error = res.data.error;
        if (error == 0) {
          var limit_date = resData[0].limit_date;
          var created_at = resData[0].created_at;
          var date = new Date(created_at.replace(/-/g, "/"));
          var restDay = app.getRestTime(nowDate, limit_date);
          
          created_at = app.getSimplyTime(created_at);
          
          that.setData({
            askdetail: resData[0],
            askdetail_userId: resData[0].q_user_id,
            restDay: restDay,
            created_at: created_at,
            askStatus: resData[0].status,
          })
          console.log(that.data.askdetail_userId)
          
        }
      }
    })
  },

  getComment: function(e) {
    var comment = e.detail.value;
    console.log(comment)
    this.setData({
      comment: comment
    })
  },

  addComment: function() {
    var that = this;
    if (that.data.comment != '') {
      if (that.data.userId == that.data.askdetail_userId) {
        wx.showToast({
          title: '亲，您不能回答自己的问股',
          icon: 'none'
        })
        that.setData({
          comment: ''
        })
      } else if (that.data.askStatus != '-1') {
        wx.showToast({
          title: '亲，该问股已结束，不能提交回答',
          icon: 'none'
        })
        that.setData({
          comment: ''
        })
      } else {
        wx.request({
          url: 'https://zhitouapi.romawaysz.com/comment/create',
          data: {
            token: app.union_id,
            type: 3,
            id: that.data.id,
            content: that.data.comment,
          },
          success: function(res) {
            if (res.data.error == 0) {
              wx.showToast({
                title: '回答成功',
              })
              that.setData({
                comment: ''
              })
              that.getCommetList();
              that.getAskDetail();
            }
          }
        })

      }
    } else {
      wx.showToast({
        title: '回答内容不能为空',
        icon: 'none'
      })
    }
  },
  //获取评论列表
  getCommetList: function() {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/comment/list',
      data: {
        token: app.union_id,
        type: 3,
        id: that.data.id,
        next: that.data.commentNext,
        size: 10,
      },
      success: function(res) {
        var resData = res.data.data;
        var error = res.data.error;
        if (error == 0) {
          var noComment;
          if (resData.length == 0) {
            noComment = true;
          } else {
            noComment = false
          }
          var commentList;
          commentList = resData.map(function(item) {
            item.newCreated_at = app.getSimplyTime(item.created_at);
            return item;
          })

          that.setData({
            commentList: resData,
            noComment: noComment
          })
        }
      }
    })
  },
  //点赞
  createPraise: function(e) {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/praise/create',
      data: {
        token: app.union_id,
        user_id: app.localUserData.user_id,
        type: 3,
        sId: e.currentTarget.dataset.id
      },
      success: function(res) {
        if (res.data.error == 0) {
          wx.showToast({
            title: '点赞成功',
          })
          that.getCommetList();
        } else if (res.data.error == 10200) {
          wx.showToast({
            title: '请勿重复点赞',
          })
        } else {
          wx.showToast({
            title: '错误' + res.data.error,
          })
        }
      },
    })
  },
  //采纳答案
  setSatistyAnswer: function(e) {
    var that = this;
    var aid = e.currentTarget.dataset.aid;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/set',
      data: {
        token: app.union_id,
        id: that.data.id,
        c_id: aid
      },
      success: function(res) {
        var resData = res.data.data;
        var error = res.data.error;
        if (error == 0) {
          wx.showToast({
            title: '采纳答案成功',
          })
          that.getSatistyAnswer();
          that.getCommetList();
          that.getAskDetail();
        }
      }
    })
  },
  //获取满意答案
  getSatistyAnswer: function() {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/SatisfyAnswer',
      data: {
        token: app.union_id,
        id: that.data.id
      },
      success: function(res) {
        var resData = res.data.data;
        var error = res.data.error;
        var satistyAnswer;
        if (error == 0) {
          if (resData != '') {
            resData[0].created_at = app.getSimplyTime(resData[0].created_at);
            that.setData({
              satistyAnswer: resData,
              satistyAnswerId: resData[0].c_id,
              hasSatistyAnswer: true,
              c_user_id: resData[0].c_user_id
            })
            console.log(that.data.c_user_id)
          } else if (resData == '') {
            //noComment
            that.setData({
              satistyAnswer: resData,
            })
          }
        }
      }
    })
  },

  setMaskIndexFun: function() {
    this.setData({
      isShowMask: false
    })
  },
  showMask: function() {
    this.setData({
      isShowMask: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    this.setData({
      id: id,
      userId: app.localUserData.user_id,
      noComment: true
    });
    this.getSatistyAnswer();
    this.getAskDetail();
    this.getCommetList();
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
    this.setData({
      noComment: true
    })
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
      imageUrl: '../images/shareImg.png',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})