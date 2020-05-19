const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const loginRouter = express.Router()
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
loginRouter.use(bodyParser.urlencoded({extended:false}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();
loginRouter.post('/user/login',(req,res)=>{
    let requestBody = tranform.transformFormat(req.body)
    let telephone = requestBody.telephone
    let password = requestBody.password
    connection.query(`SELECT class,idCard,telephone,type,username from user WHERE telephone= ${telephone} AND password=${JSON.stringify(password)}`, function (error, results, fields) {
        if (error) console.log(error)
        if (results.length == 0) {
            res.send({
                code:"1",
                data:"用户名或者密码错误"
                })
        } else {
            res.send({
                code:"2",
                data:results[0]
            })
        }
    })
})

module.exports = loginRouter