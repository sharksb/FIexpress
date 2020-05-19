const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
const resetPasswordRouter = express.Router()

// 创建application/x-www-form-unlencoded解析器
resetPasswordRouter.use(bodyParser.urlencoded({extended:false}))

const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();
 
resetPasswordRouter.post('/user/resetPassword',(req,res)=>{
    let requestBody = tranform.transformFormat(req.body)
    let telephone = requestBody.telephone
    let password = requestBody.password 
    connection.query(`UPDATE user SET password = ${JSON.stringify(password)}  WHERE telephone = ${JSON.stringify(telephone)} `, function (error, results, fields) {
        if (error) throw error;
        console.log(results,fields)
        res.send({
            code:1,
            data:"修改成功"
        })
      });
})

module.exports = resetPasswordRouter


