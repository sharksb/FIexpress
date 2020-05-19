const express = require('express')

const obtainTeacherRouter = express.Router()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
obtainTeacherRouter.use(bodyParser.json())
obtainTeacherRouter.use(bodyParser.urlencoded({
    extended: false
}))


const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


obtainTeacherRouter.get('/platform/obtainTeacher', (req, res) => {
    connection.query(`SELECT * FROM  teacher ORDER BY time DESC`, function (error, results) {
            if(error){
                console.log(error)
                res.send({
                    code:1,
                    message:"发送失败"
                })
            }else {
                console.log(results)
                let sendData = []
                for(result of results){
                   let data = {
                       title:result.title
                   }
                   sendData.push(data)
                }
                res.send({
                    code:2,
                    message:"发送成功",
                    data:sendData
                })
            }
    })
    
 


})


module.exports = obtainTeacherRouter