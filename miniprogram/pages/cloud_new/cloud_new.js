let  app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  but() {
    // wx.cloud.callFunction({ //调用用函数
    //   name: 'addData'
    // }).then(res => {
    //   console.log(res)
    // })
    let db = wx.cloud.database()
    db.collection('test').add(
      {
        data:{
          name: 'test3',
          age: '18',
          sku: 'hello word'
        },

      }).then(res => {
        console.log(res)
      })
  },
  but_2(){
    let db = wx.cloud.database()
    wx.cloud.callFunction({//获取openid
      name: 'getOpenId',
      complete: res => {
        console.log('openid--', res.result)
         

        db.collection('userS').where({
          _openid: res.result.openid,

        }).get()
          .then(res => {
        console.log(res)

            res.data[0]._id
            db.collection('userS').doc(res.data[0]._id).update({
              // data 传入需要局部更新的数据
              data: {
                // 表示将 done 字段置为 true
                done: true
              },
              success: function (res) {
                console.log(res)
              }
            })
            
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
   
  },
  but_1() {
    console.log('11')
    let db = wx.cloud.database();
    db.collection('test').get().then(res => {
      console.log(res)
    })
  }, onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  onLoad: function(options) {
    console.log(app.globalData)
    let db = wx.cloud.database();
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('openid--', res.result)
        var openid = res.result.openid
        
    }
    })
    // wx.getSetting({//用户授权结果
    //   success(res) {
    //     console.log(res.authSetting)
    //     res.authSetting = {
    //       "scope.userInfo": true,
    //       "scope.userLocation": true
    //     }
    //   }
    // })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo()
            }
          })
        }
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})