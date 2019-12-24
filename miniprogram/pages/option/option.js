
let data_json = require('../../data/data.js')
let Date_1 = require('../../utils/index.js')
let app = getApp()
// console.log(data_93)
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog'; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '个人的内心想法' },
      { name: 'CHN', value: '朋友和家人' },
        // { name: 'BRA', value: '巴西' },
        // { name: 'JPN', value: '日本' },
        // { name: 'ENG', value: '英国' },
        // { name: 'FRA', value: '法国' },
    ],
    data:[],
    index:1,//上拉加载
    data2:[],
    btn_trfa:'none',
    // choose:2,
    data_all:[],
    title_innHTML:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  test_click(){

    Dialog.confirm({
      title: '开始计算测试结果',
      message: '如有选择项未选择！会影响测试结果！'
    }).then(() => {
      let index= Math.round(Math.random() * 3)
      let date = Date_1.formatTime(new Date())
      let db = wx.cloud.database()
      db.collection('userS').doc(app.globalData._id).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          MBTI:{
            index,
            date
          }
        },
        success: function (res) {
          wx.reLaunch({
            url: '../testResult/testResult',
          })
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  onLoad: function (options) {
    console.log(options.index)
    // console.log(Date_1.formatTime(new Date()))
    let choose = options.index
    let data = []
    let title_innHTML = ''
    if (choose == 0){
      data = data_json.data_93
      title_innHTML = 'MBTI职业性格测试（92题版）'
    } else if (choose ==1){
      data = data_json.data_31
      title_innHTML = 'MBTI职业性格测试(32题版）'
    }
    this.setData(
      {
        data_all:data,
        data: data.slice(0, 20),
        title_innHTML
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
  onReachBottom: function (e) {
    console.log("底部") 
    let than = this
    let index = this.data.index+1
    let data = this.data.data_all.slice(0, 20*index)
    let data2 = this.data.data_all.slice(0, 20 * index-1)
    let btn_trfa = 'none'
    // index+
    if (data.length == data2.length){
       btn_trfa = 'block'
    }
    
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000,
      success(){
        than.setData({
          index,
          data,
          data2,
          btn_trfa
        })
        console.log(data2.length)
        console.log(data.length)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})