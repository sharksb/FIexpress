const express = require('express')

const showOneMessageRouter = express.Router()

const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

showOneMessageRouter.get('/platform/showOneMessage', (req, res) => {

    // 接收账号的id号
    let reciveidcard = req.query.reciveidcard

    // 本人的id号
    let sendidcard = req.query.sendidcard

    new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM  chat WHERE reciveidcard = ${reciveidcard} AND sendidcard =${sendidcard}
        ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
            if (error) {
                console.log(error)
                res.send({
                    code: 1,
                    messsage: "查询失败",
                })
            } else {
                resolve(sqlresults)
            }
        })
    }).then((result1) => {
        connection.query(`SELECT * FROM  chat WHERE reciveidcard = ${sendidcard} AND sendidcard =${reciveidcard}
        ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
            if (error) {
                console.log(error)
                res.send({
                    code: 1,
                    messsage: "查询失败",
                })
            } else {
                console.log(sqlresults)
                let result2 = sqlresults

                // 本人给其他人发送的消息
                console.log('1', result1)

                // 其他人给本人发送的消息
                console.log('2', result2)

                let result3 = result1.concat(result2)
                
                result3.sort((a,b)=>{
                    return a.uploadTime - b.uploadTime
                });
                let sendData = []
                for (result of result3) {
                    result.uploadTime = result.uploadTime.getTime()
                    let data = {
                        sendidcard:result.sendidcard,
                        title:result.title
                    }
                    sendData.push(data)
                }
                console.log(sendData)
                res.send({
                    code:2,
                    messsage:"发送成功",
                    data:sendData
                })
                
            }
        })
    })







})


module.exports = showOneMessageRouter