let app =  getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
     view_1:[
       {
         title:'生涯咨询',
         a_price:'￥ 500',
         b_price:'原价 ￥ 1298 ',
         content:'90分钟1对1语音咨询服务，帮助您找到阻碍职业发展的根本原因，发现自身优势'
       },
       {
         title: '职业生涯案例咨询',
         a_price: '￥ 1428',
         b_price: '原价 ￥ 2888 ',
         content: '3次咨询，每次90分钟1对1语音咨询服务，帮助您找到阻碍职业发展的根本原因，发现自身优势，共同制定解决方案，并提供咨询报告'
       }  
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  active_index(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      active : e.currentTarget.dataset.index
    })
    
    console.log(this.data.active)
  },
  onLoad: function (options) {
    console.log(app.globalData)
   
  },
  pay_btn() {

    if (app.globalData.user_tag == false) {//有未登陆过
      Dialog.confirm({
        message: '您还没注册，请在个人中心点击登陆'
      }).then(()=>{
        wx.switchTab({
          url: '../my/my',
        })
      })
     
    } else if (app.globalData.user_details == false){ //没有详情
      Dialog.confirm({
        message: '您还填写您的个人信息'
      }).then(() => {
        wx.reLaunch({
          url: '../404/404',
        })
      })
    
    }
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