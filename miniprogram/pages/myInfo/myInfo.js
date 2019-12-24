const date = new Date()
const years = []
const months = []
const days = []
let app = getApp()
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 4,
    days: days,
    day: 4,
    value: [9999, 1, 1],
    year2: date.getFullYear(),
    month2: 2,
    day2: 2,
    year3: date.getFullYear(),
    month3: 2,
    day3: 2,
    date1: '',
    data2: '',
    items: [
      { name: '高中', value: '高中', checked: 'true' },
      { name: '中专', value: '中专', },
      { name: '大专', value: '大专' },
      { name: '本科', value: '本科' },
      { name: '研究生', value: '研究生' },
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士 ' },
    ],
    step: 0,
    display: 'none',
    data_NEW: '',//毕业最开始时间
    data_NEW2: '',//毕业结束时间
    myInfo_title: '',//学校名称
    professional: '',//专业名称
    degree: '',//学历等级

    company_Name: '',//公司名字
    data_NEW3: '',//入职时间
    industry: '',//行业
    fun: '',//职能
    monthly_salary: '',//月薪
    email: '',//邮箱
    phone_number: '',//手机号
    nextStep: '下一步'

  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData(
      {
        degree: e.detail.value,
      }
    )
  },

  myInfo_title: function (e) {//学校名称
    this.setData({
      myInfo_title: e.detail.value
    })
    // console.log(this.data.myInfo_title)
  },
  professional: function (e) {//学校名称
    this.setData({
      professional: e.detail.value
    })
    // console.log(this.data.myInfo_title)
  },
  companyName: function (e) {//公司名称
    this.setData({
      company_Name: e.detail.value
    })
  },
  industry: function (e) {//行业
    this.setData({
      industry: e.detail.value
    })
  },
  fun: function (e) {//职能
    this.setData({
      fun: e.detail.value
    })
  },
  monthly_salary: function (e) {//月薪
    this.setData({
      monthly_salary: e.detail.value
    })
  },
  email: function (e) {//邮箱
    this.setData({
      email: e.detail.value
    })
  },
  phone_number: function (e) {//邮箱
    this.setData({
      phone_number: e.detail.value
    })
  },
  next_step: function () {
    // wx.switchTab({
    //   url: '../index/index',
    //   success:(res => {
    //     console.log(res)
    //   }),
    //   fail:(res => {
    //     console.log(res)
    //   })
    // })
    let data = this.data
    let data_NEW = new Date(data.data_NEW).getTime();
    let data_NE2 = new Date(data.data_NEW2).getTime();
    if (data.step == 0) {
      if (data.myInfo_title == '' || data.data_NEW == '' || data.data_NEW2 == '' || data.myInfo_title == '' || data.professional == '' ||  data.degree == '') {
        Dialog.alert({
          message: '尚有选项未选择'
        })
      } else if (data_NEW > data_NE2) {
        Dialog.alert({
          message: '进校时间不能大于毕业时间'
        })

      } else {
        let step = this.data.step + 1
      
        this.setData(
          {
            step,
            nextStep: '完成'
          }
        )
      }
    } else if (data.step == 1) {
      if (data.company_Name == '' || data.data_NEW3 == '' || data.industry == '' || data.fun == '' || data.monthly_salary == '' || data.email == '' || data.phone_number == '') {
        Dialog.alert({
          message: '尚有选项未选择或填写'
        })
     return
      }
      console.log('11')
     
      console.log(app.globalData._id+ ' 用户数据库id')

      let db = wx.cloud.database()
      db.collection('userS').doc(app.globalData._id).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              education:{
                data_NEW: data.data_NEW,//毕业最开始时间
                data_NEW2: data.data_NEW2,//毕业结束时间
                myInfo_title: data.myInfo_title,//学校名称
                professional: data.professional,//专业名称
                degree: data.degree,//学历等级
              },
              level:{
                company_Name: data.company_Name,//公司名字
                data_NEW3: data.data_NEW3,//入职时间
                industry: data.industry,//行业
                fun: data.fun,//职能
                monthly_salary: data.monthly_salary,//月薪
                email: data.email,//邮箱
                phone_number: data.phone_number,//手机号
              }
            },
            success: function (res) {
              console.log(res)
              wx.switchTab({
                url: '../index/index',
                success: (res => {
                  console.log(res)
                }),
                fail: (res => {
                  console.log(res)
                })
              })
              app.globalData.user_details = true
            }
          })


    }
    console.log('11')

   
  },

  cancel:function(){
    Dialog.confirm({
      message: '取消资料资料输入么？'
    }).then(() => {
      // on confirm
      wx.switchTab({
        url: '../index/index'
      })
    }).catch(() => {
      // on cancel
    });
    
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      data_NEW: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
    })
  },
  bindChange2: function (e) {
    const val = e.detail.value
    this.setData({
      year2: this.data.years[val[0]],
      month2: this.data.months[val[1]],
      day2: this.data.days[val[2]],
      data_NEW2: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
    })
  },
  bindChange3: function (e) {
    const val = e.detail.value
    this.setData({
      year3: this.data.years[val[0]],
      month3: this.data.months[val[1]],
      day3: this.data.days[val[2]],
      data_NEW3: this.data.years[val[0]] + '-' + this.data.months[val[1]] + '-' + this.data.days[val[2]]
    })
  }
})