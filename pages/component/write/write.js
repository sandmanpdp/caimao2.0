// pages/component/write/write.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    writeFun : function () {
      this.setData({
        isShow : true
      })
    },
    toNote : function () {
      wx.switchTab({
        url: '/pages/write/write',
      })
    },
    toAsk : function () {
      wx.navigateTo({
        url: '/pages/askreward/askreward',
      })
    },
    closeMask : function () {
      this.setData({
        isShow: false
      })
    }
  }
})
