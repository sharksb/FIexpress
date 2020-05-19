const express = require('express')

const sendTeacherRouter = express.Router()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
sendTeacherRouter.use(bodyParser.json())
sendTeacherRouter.use(bodyParser.urlencoded({
    extended: false
}))


const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


sendTeacherRouter.post('/platform/sendTeacher', (req, res) => {
    let title = req.body.title
    let time = tranform.transformMinutes(new Date())


    connection.query(`INSERT INTO teacher(title,time) 
    VALUES(${JSON.stringify(title)},${JSON.stringify(time)})`, function (error, results) {
            if(error){
                console.log(error)
                res.send({
                    code:1,
                    message:"发送失败"
                })
            }else {
                console.log(results)
                res.send({
                    code:2,
                    message:"发送成功"
                })
            }
    })
    
 


})


module.exports = sendTeacherRouter
