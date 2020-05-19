const express = require('express')

const mysql = require('mysql')
const obtainAllStudentRouter = express.Router()

const connectionDb = require('../../common/connectDatabase')

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();




obtainAllStudentRouter.get('/platform/obtainAllStudent', (req, res, next) => {
    connection.query(`SELECT username,idCard FROM user`, function (error, sqlresults, fields) {
        if (error) {
            console.log(error)
            res.send({
                code:1,
                message:"查询失败",
            })
        } else {
            res.send({
                code:2,
                message:"查询成功",
                data:sqlresults
            })
        }
    })
})

module.exports = obtainAllStudentRouter