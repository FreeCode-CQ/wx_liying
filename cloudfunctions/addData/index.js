// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
let db = cloud.database()
exports.main = async (event, context) => {
  console.log('11')
  return await db.collection('test').add(
    {
      data: {
        name: 'test2',
        age: '28',
        job: 'javascript'
      }
    }
  )
}