let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:'1',
        text:'订单管理',
        image:'../../images/order_1.png'
      },
      {
        id: '2',
        text: '个人描述',
        image: '../../images/my_1.png'
      },
      {
        id: '3',
        text: 'MBIT测试',
        image: '../../images/test.png'
      },
     
    ],
    logo_if: '',
    user_view: [],
    show: false,
    value: '',
    username:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onGotUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    let openid = ''
    let user_data = []
    let db = wx.cloud.database()
    console.log(e.detail.userInfo)
    wx.cloud.callFunction({//获取openid
      name: 'getOpenId',
      complete: res => {''
        console.log('openid--', res.result)
         openid = res.result.openid

        db.collection('userS').where({
          _openid: openid,
          
        }).get()
            .then(res =>{
              console.log(res)
             let  user_data = res.data[0]
              console.log(user_data)
              if (user_data == null){
                let userInfo = e.detail.userInfo
                // console.log(e.detail.rawData)
                // if ()
                let gender = ''
                switch (userInfo.gender) {
                  case 0:
                    gender = '未知'
                    break
                  case 1:
                    gender = '男'
                    break
                  case 2:
                    gender = '女'
                    break
                }
                let temporary = {}
                temporary.nickName = userInfo.nickName,
                temporary.address = userInfo.address,
                temporary.gender = userInfo.country + "-" + userInfo.province + "-" + userInfo.city,
                  temporary.avatarUrl = userInfo.avatarUrl
                console.log(temporary)
                this.setData(
                  {
                    user_view: temporary,
                    logo_if:true
                  }
                )
                db.collection('userS').add(//如果没有用户消息就存储
                  {
                    data: {
                      nickName: userInfo.nickName,
                      address: userInfo.country + "-" + userInfo.province + "-" + userInfo.city,
                      gender,
                      avatarUrl: userInfo.avatarUrl,
                      
                    },
                    
                  }).then(res => {
                    console.log(res)
                   
                  })
                  .catch(err =>{
                    console.log(err)
                  })
                
              }else{
                console.log('已有用户')
                // user_view.nickName = 
              }
            })
            .catch(err => {
              console.log(err)
            })
      }
    })
  },
  userInput(e){
    // console.log(e.detail)
    this.setData({
      username: e.detail
    })
  },
  password(e){
    this.setData({
      password: e.detail
    })
  },
  Administrator_click(){//跳转后台管理
    console.log(this.data.username)
    console.log(this.data.password)
    if (this.data.username == 123 && this.data.password  ==123){
      console.log('开始跳转')
      wx.navigateTo({
        url: '../administrator/administrator',
      })
    }
  },
  showPopup() {//管理员登陆弹窗
    this.setData({ show: true });
  },
  onClose() {//管理员登陆弹窗
    this.setData({ show: false });
  },
  jump_info(e){
    var index = e.currentTarget.dataset.index
    if (index == 1){
      if (app.globalData.user_details == false ){
        wx.navigateTo({
          url: '../404/404'　　// 页面 A
        })
      }else{
        wx.navigateTo({
          url: '../my_details/my_details'　　// 页面 A
        })
      }
    }else if(index == 2){
      console.log(app.globalData.MBTI )
      console.log(app.globalData.MBTI == [])
      if ( !app.globalData.MBTI  ){
        wx.navigateTo({
          url: '../test/test',
        })
      } else {
      
        wx.navigateTo({
          url: '../testResult/testResult'　　// 页面 A
        })
      }
    }
    console.log(index)
  },
  onLoad: function (options) {
    
    console.log(app.globalData.user_tag)
    // let logo_if = ''
    this.setData(
      {
        logo_if: app.globalData.user_tag,
        user_view: app.globalData
      }
    )
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