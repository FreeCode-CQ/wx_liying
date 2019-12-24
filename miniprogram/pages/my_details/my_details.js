let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    gender:'',
    address:"",
    education:[],
    level:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    let db = wx.cloud.database()
    db.collection('userS').where({
     _id: app.globalData._id
    }).get()
      .then(res => {
        this.setData(
          {
            education: res.data[0].education,
            level: res.data[0].level,
            nickName: res.data[0].nickName,
            gender: res.data[0].gender,
            address: res.data[0].address
          }
        )
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