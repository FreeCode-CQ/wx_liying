Page({

  /**
   * 页面的初始数据
   */
  data: {
     data:[
       {
         image: "../../images/gradual_red.png",
         title:'MBTI职业性格测试（92题版）',
         title1:'personality test (question 92)',
         title2:'职业性格测试'
       },
       {
         image: "../../images/gradual_blue.png",
         title: 'MBTI职业性格测试（32题版）',
         title1: ' personality test (question 32)',
         title2: '职业性格测试'
       }
     ],
    Topic:false,
    title: 'MBTI职业性格 92题 ',
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Topic_click(event){
    let index = event.currentTarget.dataset.index
    let title=''
    if (index ==0){
      title= 'MBTI职业性格 92题 '
    }else if(index == 1){
      title= 'MBTI职业性格 32题 '
    }
    this.setData(
      {
        Topic:true,
        title,
        index
      }
    )
  },
  onLoad: function (options) {
    
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