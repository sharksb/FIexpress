const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const transform = require('../../common/transform')
const writePlatformRouter = express.Router()
writePlatformRouter.use(bodyParser.json())
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
writePlatformRouter.use(bodyParser.urlencoded({extended:false}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// 引入表
let platformDetail = require('../../mongodb/platformDetailSchema')

writePlatformRouter.post('/platform/writePlatform',(req,res,next)=>{
    let reqdata = req.body
    let username = reqdata.username
    let title = reqdata.title
    let showtime = transform.transformMinutes(new Date())   
    connection.query(`INSERT INTO platform(username,title,time) VALUES(${JSON.stringify(username)},${JSON.stringify(title)},${JSON.stringify(showtime)})`, function (error, sqlresults, fields) {
        if(error){
            console.log(error)
        }else {
            console.log(sqlresults)
           new platformDetail({
            username: username,
            time:showtime,
            title:title,
            platformDetails: []
           }).save((err,monresult)=>{
               if(err){
                   console.log(err)
               }else {
                   console.log(monresult)
                   res.send({
                       code:2,
                       message:"发送成功"
                   })
               }
           })
        }
    })
})

module.exports = writePlatformRouter