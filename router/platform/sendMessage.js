const express = require('express')

const sendMessageRouter = express.Router()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
sendMessageRouter.use(bodyParser.json())
sendMessageRouter.use(bodyParser.urlencoded({
    extended: false
}))


const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


sendMessageRouter.post('/platform/sendMessage', (req, res) => {
    let requestBody = req.body
    let sendidcard = requestBody.sendidcard
    let sendusername = requestBody.sendusername
    let reciveusername = requestBody.reciveusername
    let reciveidcard = requestBody.reciveidcard
    let title = requestBody.title
    let uploadTime = tranform.transformMinutes(new Date())


    connection.query(`INSERT INTO chat(sendidcard,sendusername,reciveusername,reciveidcard,title,uploadTime) 
    VALUES(${sendidcard},${JSON.stringify(sendusername)},${JSON.stringify(reciveusername)},${reciveidcard},${JSON.stringify(title)},${JSON.stringify(uploadTime)})`, function (error, results) {
            if(error){
                console.log(error)
                res.send({
                    code:1,
                    message:"发送失败"
                })
            }else {
                res.send({
                    code:2,
                    message:"发送成功"
                })
            }
    })
    
 


})


module.exports = sendMessageRouter