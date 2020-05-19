const express = require('express')
const countTeacherRouter = express.Router()
const mysql = require('mysql')

const connectionDb = require('../../common/connectDatabase')

const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


countTeacherRouter.get('/platform/countTeacher', (req, res) => {
    connection.query(`SELECT count(*) FROM  teacher ORDER BY time DESC`, function (error, results) {
            if(error){
                console.log(error)
                res.send({
                    code:1,
                    message:"发送失败"
                })
            }else {
                console.log(results[0]['count(*)'])
                res.send({
                    code:2,
                    message:"发送成功",
                    data:results[0]['count(*)']
                })
            }
    })
    
 


})


module.exports = countTeacherRouter