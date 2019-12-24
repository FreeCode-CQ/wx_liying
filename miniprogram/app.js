//app.js

App({
  globalData: {
    user_tag: false,//默认false为该用户没有注册过，true为该用户已经注册
    open_id:'',//用户openid
    nickName:'',//微信名字
    gender:'',//性别
    avatarUrl:'',//头像
    address:'',//地址
    user_details:false//是否存储了用户详情
  },
  onLaunch: function () {
    let openid = ''
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'prject-dev',
        traceUser: true,
      })
      let db = wx.cloud.database()
      wx.cloud.callFunction({//获取openid
        name: 'getOpenId',
        complete: res => {
          console.log('openid--', res.result)
          openid = res.result.openid
          db.collection('userS').where({
            _openid: openid,

          }).get()
            .then(res => {
              console.log(res.data[0] )
              if (res.data[0] == undefined ){
                // console.log('未有用户 ' + this.globalData.user_tag)
                this.globalData.user_tag = false //数据库里未有改用户
                console.log('app 数据库里未有改用户')
                
              } else if (res.data[0] != undefined){
                console.log( '已有用户')
                this.globalData.user_tag = true //已有改用户
                let { address, avatarUrl, gender, nickName, _openid,_id,MBTI}= res.data[0]
                this.globalData.nickName = nickName
                this.globalData.avatarUrl = avatarUrl
                this.globalData.gender = gender
                this.globalData.address = address
                this.globalData.open_id = _openid
                this.globalData._id = _id
                if (MBTI){
                  this.globalData.MBTI = true
                }else{
                  this.globalData.MBTI = false
                }
               
                if (res.data[0].education != null && res.data[0].level != null ){
                  this.globalData.user_details = true //用户有详情
                  console.log(this.globalData)

                }
              }
            })
          


        }
      })
    }

 

  }
})