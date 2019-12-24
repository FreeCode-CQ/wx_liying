let data_json = require('../../data/data.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    date_test:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let db = wx.cloud.database()
    db.collection('userS').where({
      _openid: app.globalData.open_id,

    }).get().then(res => {
      console.log(res)
      if (res.data[0].MBTI){
        let data = data_json.random_test[res.data[0].MBTI.index]
        let date_test = res.data[0].MBTI.date
        app.globalData.MBTI = true
        this.setData({
          data,
          date_test
        })
      }
     
    })
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