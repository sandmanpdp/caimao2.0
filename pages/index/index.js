//获取应用实例
var app = getApp();
var getData = require('../getData/getData.js');
Page({
  data: {
    size: 10,
    hot: [], //热门笔记
    view: [], //热门观点
    recommend: [], //高手推荐
    authStatus: app.authStatus,
    quizList: '',
    isShow: false,
    readMaskState: false,
    userId: '',
    swiperData : ""
  },

  openMsk: function(e) {
  
  },
  onGotUserInfo: function(e) {
    var that = this;
    if (app.globalData.userInfo == null) {
      app.globalData.userInfo = e.detail.userInfo;
      app.authStatus = false;
      that.setData({
        authStatus: false
      })
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {} else {
            //调用应用实例的方法获取全局数据
            app.getUserInfo(function(userInfo) {
              //更新数据
              that.setData({
                userInfo: userInfo
              })
              app.serverUserData = userInfo
              var time2 = setInterval(function() {
                if (app.globalData.startState) {
                  app.getserverUserData()
                  clearInterval(time2)
                }
              }, 100)
            })
          }
        }
      })

      var time = setInterval(function() {
        if (app.requestState == true) {
          setTimeout(function() {
            that.getUserData()
            that.getActivity()
            that.getUnreadFun();
          }, 500)
          clearInterval(time)
        }
      }, 100)
    }
  },

  denyAuth: function() {
    this.setData({
      authStatus: false
    })
  },
  //购买方法
  buyFun: function(e) {
    console.log("buyFun!!!!!!!!!!!!1");
    // var that = this
    // wx.request({
    //   url: "https://zhitouapi.romawaysz.com/note/createRead",
    //   data: {
    //     sId: e.currentTarget.id.split("_")[1],
    //     type: 2,
    //     token: app.union_id
    //   },
    //   success: function (res) {
    //     if (res.data.error == 0) {
    //       wx.navigateTo({
    //         url: '/pages/notedetails/notedetails?id=' + e.currentTarget.id.split("_")[1] + '&uid=' + e.currentTarget.dataset.uid
    //       })
    //     } else {
    //       wx.navigateTo({
    //         url: '/pages/notebuy/notebuy?id=' + e.currentTarget.id.split("_")[1] + '&uid=' + e.currentTarget.dataset.uid
    //       })
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '/pages/notebuy/notebuy?id=' + e.currentTarget.id.split("_")[1] + '&uid=' + e.currentTarget.dataset.uid
    })
  },

  // 阅读方法
  readFun: function(e) {
    console.log("readFun");
    var that = this;
    if (that.data.user_id != e.currentTarget.dataset.uid) {

      wx.request({
        url: "https://zhitouapi.romawaysz.com/note/createRead",
        data: {
          sId: e.currentTarget.id.split("_")[1],
          type: 2,
          token: app.union_id
        },
        success: function(res) {

        }
      })
    }
    wx.navigateTo({
      url: '/pages/notedetails/notedetails?id=' + e.currentTarget.id.split("_")[1] + '&uid=' + e.currentTarget.dataset.uid
    })
  },

  detailsAskFun: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/askdetails/askdetails?id=' + id,
    })
  },
  getUserData: function() {
    var that = this
    // 热门笔记请求
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/note/noteList',
      data: {
        next: '-1',
        order: 'hot',
        index: '-1',
        area: 0,
        size: that.data.size,
        token: app.union_id
      },
      success: function(res) {
        if (res.data.error == 0) {
          var a = []
          var b = res.data.data
          if (b != '') {
            for (var i = 0; i < 3 && i < b.length; i++) {
              a.push(b[i])
              a[i]['day'] = app.getThisDay(b[i].created_at, b[i].work_date)
              if (b[i].is_look == -1 && b[i].price != 0 && b[i].is_reach == -1) { //没看过 付费 进行中
                a[a.length - 1]['readOrbuyFun'] = 'buyFun'
              } else {
                a[a.length - 1]['readOrbuyFun'] = 'readFun'
              }
            }
            that.setData({
              hot: a
            })
          }
        }
      }
    })
    // 热门观点请求
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/view/list',
      data: {
        page: 1,
        size: that.data.size,
        token: app.union_id
      },
      success: function(res) {
        if (res.data.error == 0) {
          var a = []
          var b = res.data.data
          if (b != '') {
            for (var i = 0; i < 3 && i < b.length; i++) {
              a.push(b[i])
            }
            console.log(a)
            that.setData({
              view: a
            })

          }
        }
      }
    })
    //高手推荐请求
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/note/hotUserList',
      data: {
        user_id: app.localUserData.user_id,
        token: app.union_id,
        order: 'increase'
      },
      success: function(res) {
        if (res.data.error == 0) {
          var a = [];
          var b = res.data.data
          if (b != '') {
            for (var i = 0; i < 4 && i < b.length; i++) {
              if (b[i].id == app.localUserData.user_id) {
                if (b[4]) {
                  a.push(b[4])
                }
              } else {
                a.push(b[i])
              }
            }
            that.setData({
              recommend: a
            })
          }
        }
      }
    })
  },

  getActivity: function() {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/activity/Img',
      data: {
        token: app.union_id,
        site: 0
      },
      success: function(res) {
        var resData = res.data.data;
        that.setData({
          swiperData: resData
        })
        console.log(resData);
      }
    })
  },

  //当前页面下拉刷新
  onPullDownRefresh: function() {
    var that = this
    success: {
      that.getUserData();
      that.getQuizList();
      setTimeout(function() {
        wx.stopPullDownRefresh()
      }, 500)
    }
    // getData.getUserInfo({ token: app.union_id },function (res) {
    //   console.log('##############');
    //   console.log(res)
    // })
  },
  //购买方法
  // buyFun: function(e) {
  //   var that = this
  //   wx.request({
  //     url: "https://zhitouapi.romawaysz.com/note/createRead",
  //     data: {
  //       sId: e.currentTarget.id,
  //       type: 2,
  //       token: app.union_id
  //     },
  //     success: function(res) {
  //       console.log(res)
  //       if (res.data.error == 0) {
  //         wx.navigateTo({
  //           url: '/pages/notedetails/notedetails?id=' + e.currentTarget.id + '&uid=' + e.currentTarget.dataset.uid
  //         })
  //       } else {
  //         wx.navigateTo({
  //           url: '/pages/notebuy/notebuy?id=' + e.currentTarget.id + '&uid=' + e.currentTarget.dataset.uid
  //         })
  //       }
  //     }
  //   })
  // },
  // 笔记阅读方法
  noteReadFun: function(e) {
    wx.navigateTo({
      url: '/pages/notedetails/notedetails?id=' + e.currentTarget.id + '&uid=' + e.currentTarget.dataset.uid
    })
  },
  // 问股诊股方法
  askFun: function(e) {
    wx.navigateTo({
      url: '/pages/ask/ask'
    })
  },
  // 观点阅读方法
  viewReadFun: function(e) {
    wx.navigateTo({
      url: '/pages/viewdetails/viewdetails?id=' + e.currentTarget.id
    })
  },
  // 高手推荐跳转方法
  recommendJumpFun: function(e) {
    wx.navigateTo({
      url: '/pages/master/master?id=' + e.currentTarget.id
    })
  },
  // 未开放提示
  unopenedFun: function(e) {
    wx.showToast({
      title: '暂未开放',
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
  //问股
  getQuizList: function() {
    var that = this;
    var nowDate = new Date();
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/quiz/list',
      data: {
        page: 1,
        size: 3,
        token: app.union_id,
        state : -1
      },
      success: function(res) {
        var quizList = res.data.data;
        var newQuizList = quizList.map(function(item) {
          item.resDay = app.getRestTime(nowDate, item.limit_date);
          return item;
        });
        that.setData({
          quizList: newQuizList
        })
      }
    })
  },

  //获取未读数量
  getUnreadFun: function () {
    var that = this;
    wx.request({
      url: 'https://zhitouapi.romawaysz.com/msg/unreadNum',
      data: {
        token: app.union_id,
        type: 0
      },
      success: function (res) {
        var resData = res.data;
        var total;
        total = parseInt(resData.quiz.total) + parseInt(resData.view.total) + parseInt(resData.note.total) + parseInt(resData.system.total);
        var totalStr = String(total);
        if (total != 0) {
          wx.setTabBarBadge({
            index: 3,
            text: totalStr
          })
        }else {
          wx.removeTabBarBadge({
            index: 3,
          })
        }
      }
    })
  },


  //悬浮按钮
  writeFun: function() {
    this.setData({
      isShow: true
    })
  },
  toNote: function() {
    wx.navigateTo({
      url: '/pages/write/write?pageId=0',
    })
  },
  toView: function() {
    wx.navigateTo({
      url: '/pages/write/write?pageId=1',
    })
  },

  toAsk: function() {
    wx.navigateTo({
      url: '/pages/askreward/askreward',
    })
  },
  closeMask: function() {
    this.setData({
      isShow: false
    })
  },

  swiperGoto : function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/swiperActivity/swiperActivity?id='+id,
    })
  },


  //监听页面加载
  onLoad: function() {
    var that = this
    // app.getUserToken()
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      app.serverUserData = userInfo
      var time2 = setInterval(function() {
        if (app.globalData.startState) {
          app.getserverUserData()
          clearInterval(time2)
        }
      }, 100)

    })

    var time = setInterval(function() {
      if (app.requestState == true) {
        setTimeout(function() {
          that.getUserData();
          that.getQuizList();
          that.getActivity();
          that.getUnreadFun();
        }, 500)
        clearInterval(time)
      }
    }, 100)

  },
  // 生命周期函数--监听页面显示
  onShow: function() {
    var that = this;
    that.getQuizList();
    if (app.globalData.scene == 0) {
      app.globalData.scene = 1
      that.onLoad
    }
    if (app.globalData.page == true) {
      //   console.log('刷新执行了');
      that.getUserData();
      that.getActivity();
      that.getUnreadFun();
    }

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) { //未授权
          that.setData({
            authStatus: true
          })
          // wx.navigateTo({
          //   url: '/pages/authPage/authPage',
          // })
        } else {
          that.setData({
            authStatus: false
          })
        }
      }
    })
    that.setData({
      isShow: false
    })
    
  },

  // 生命周期函数--监听页面隐藏
  onHide: function() {
    app.globalData.scene -= 1;
    this.setData({
      isShow: false
    })
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