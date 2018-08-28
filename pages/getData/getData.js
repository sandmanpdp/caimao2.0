const app = getApp();
const url = 'https://zhitouapi.romawaysz.com';

const getData = {
  //用户中心
  userCenter: {
    //获取用户信息
    getUserInfo: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/userInfo',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //更改用户信息
    setChangeBase: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/changeBase',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //获取所有开关状态
    getOptionSet: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/app/optionSet',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //设置某个开关
    setOptionSet: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/app/modifyOptionSet',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //获取他人数据 
    getOtherUserInfo: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/otherUserInfo',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //设置收货地址
    setAddress: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/setAddress',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //获取收货地址
    getAddress: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/getAddress',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //获取银行卡信息
    getBankInfo: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/getBankInfo',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
    //用户老师认证
    setUpdateVery: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/account/UpdateVery',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        }
      })
    },
  },

  //关于笔记模块
  //写笔记
  note: {
    setNote: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/create',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //多排序笔记分页列表
    getNoteList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/noteList',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //笔记详情
    getNoteDetail: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/detail',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //获得关联的笔记或观点列表
    getLinkNoteView: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/linkNoteView',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //笔记逻辑列表 
    getNoteViewList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/noteViewList',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //设置关联笔记和观点
    setBindNoteView: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/bindNoteView',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //笔记的阅读用户列表 
    getNoteLookList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/noteLookList',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //我的阅读分页列表 
    getLookList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/lookList',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //笔记达人列表
    getHotUserList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/hotUserList',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },

    //增加阅读记录 包含余额自动扣费 
    setCreateRead: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/createRead',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //获取股票现价 
    getSharePricest: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/note/getSharePricest',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
  },
  //观点
  view: {
    //添加观点 
    setView: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/view/create',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //观点详情
    getViewList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/view/detail',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //获取观点分页列表
    getViewList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/view/list',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
  },
  //阅读评论点赞打赏
  comment: {
    //获取评论回复列表 
    getCommentList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/comment/list',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    setComment: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/comment/list',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    setReply: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/comment/reply',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    setPraise: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/praise/create',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    setCreateReward: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/purse/createReward',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
  },
  //资金消费
  purse: {
    //钱包首页
    getPurse: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/purse/index',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //绑定银行卡
    setBindBank: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/bank/bind',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //消费明细分页列表
    getPurseDetail: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/purse/detail',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //积分提现
    getPurseCash: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/purse/forCash',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
  },
  goods: {
    getGoodsList: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/goods/list',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
    //兑换商品 
    getGoodsBook: function(para, callback) {
      var resData = '';
      wx.request({
        url: url + '/goods/book',
        data: para,
        success: function(res) {
          resData = res.data;
          callback(resData)
        },
      })
    },
  }
}

module.exports.getUserInfo = getData.userCenter.getUserInfo;


// module.exports.changeBase = getData.userCenter.changeBase;