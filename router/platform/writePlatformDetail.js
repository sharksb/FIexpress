const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const transform = require('../../common/transform')
const writePlatformDetailRouter = express.Router()
writePlatformDetailRouter.use(bodyParser.json())
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
writePlatformDetailRouter.use(bodyParser.urlencoded({
    extended: false
}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// 引入表
let platformDetail = require('../../mongodb/platformDetailSchema')

writePlatformDetailRouter.post('/platform/writePlatformDetail', (req, res, next) => {
    let reqdata = req.body
    let username = reqdata.username
    let title = reqdata.title
    let sendusername = reqdata.sendusername
    let sendtitle = reqdata.sendtitle
    let showtime = transform.transformMinutes(new Date())
    let platformInfo = {
        username:sendusername,
        title:sendtitle,
        time:showtime
    }
    console.log(platformInfo)
    console.log(username,title)
    platformDetail.findOneAndUpdate({
        "username": username,
        "title":title
    }, {
        $push: {
            "platformDetails": platformInfo
        }
    }, (err, monres) => {
        if(err){
            res.send({
                code:1,
                message:'发送失败'
            })
        }else {
            res.send({
                code:1,
                message:'发送成功'
            })
        }
    })
    platformDetail.find({
        "username": username,
        "title":title
    },(err,result)=>{
        if(err) console.log(err)
        console.log(result)
    }
    )

})

module.exports = writePlatformDetailRouter