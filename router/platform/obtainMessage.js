const express = require('express')

const obtainMessageRouter = express.Router()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
obtainMessageRouter.use(bodyParser.json())
obtainMessageRouter.use(bodyParser.urlencoded({
    extended: false
}))


const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


obtainMessageRouter.get('/platform/obtainMessage', (req, res) => {
    let reciveidcard = req.query.reciveidcard

    connection.query(`SELECT * FROM  chat WHERE reciveidcard = ${reciveidcard}  ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
        if (error) {
            console.log(error)
            res.send({
                code:1,
                messsage:"查询失败",
            })
        } else {
            console.log(sqlresults)
            let fileterIdcard = []
            let allInfor = []
            for (let sqlres of sqlresults) {
                fileterIdcard.push(sqlres.sendidcard)
            }
            fileterIdcard = tranform.formatArray(fileterIdcard)
            new Promise((resolve, reject) => {
            for (let index in fileterIdcard) {
                    connection.query(`SELECT * FROM  chat WHERE sendidcard = ${fileterIdcard[index]} AND reciveidcard = ${reciveidcard} ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
                        if (error) {
                            console.log(error)
                        } else {
                            let sendData = {
                                sendusername: sqlresults[0].sendusername,
                                sendidcard: sqlresults[0].sendidcard,
                                title: sqlresults[sqlresults.length - 1].title,
                                count: sqlresults.length
                            }
                            console.log(sendData)
                            allInfor.push(sendData)
                            if(index == fileterIdcard.length - 1){
                                resolve(allInfor)
                            }
                        }
                    })
            }
            }).then((allInfor)=>{
                console.log(allInfor)
                res.send({
                    code:2,
                    messsage:"查询成功",
                    data:allInfor
                })
            })

            //   console.log(sendData)

        }
    })









})


module.exports = obtainMessageRouter