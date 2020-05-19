const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const transform = require('../../common/transform')
const showPlatformRouter = express.Router()
showPlatformRouter.use(bodyParser.json())
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
showPlatformRouter.use(bodyParser.urlencoded({
    extended: false
}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// 引入表
let platformDetail = require('../../mongodb/platformDetailSchema')

showPlatformRouter.get('/platform/showPlatform', (req, res, next) => {
    // let showtime = transform.transformMinutes(new Date())   
    connection.query(`SELECT * FROM platform`, function (error, sqlresults, fields) {
        if (error) {
            console.log(error)
            res.send({
                code:1,
                message:"查询失败",
            })
        } else {
            for (let sqlres of sqlresults) {
                sqlres.time = transform.transformMinutes(sqlres.time)
            }
            res.send({
                code:2,
                message:"查询成功",
                data:sqlresults
            })
        }
    })
})

module.exports = showPlatformRouter