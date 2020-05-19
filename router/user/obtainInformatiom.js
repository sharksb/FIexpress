const express = require('express')
const obtainInformationRouter = express.Router()
const mysql = require('mysql')
const connectionDb = require('../../common/connectDatabase')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();


obtainInformationRouter.get('/user/obtainInformation', (req, res) => {
    connection.query(`SELECT * from news ORDER BY addTime DESC;`, function (error, results) {
        if (error) {
            console.log(error)
            res.send({
                code: 1,
                message: "查询失败"
            })
        } else {
            res.send({
                code: 2,
                message: "添加成功",
                data:results[0]
            })
        }

    })


})


module.exports = obtainInformationRouter