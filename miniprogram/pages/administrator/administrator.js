Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  user_classification(id){
    let db = wx.cloud.database()
    db.collection('userS').doc(id).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
    })
  },
  user_details(e){//查看用户详情
    // console.log(e.target.dataset.id)
    let user_id = e.target.dataset.id
   this.user_classification(user_id)
  },
  
  onLoad: function (options) {
    let db = wx.cloud.database();
    db.collection('userS').get().then(res => {
      console.log(res)
      this.setData(
        {
          userDate:res.data
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