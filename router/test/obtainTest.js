const express = require('express')

const obtainTestRouter = express.Router()

const transform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// mysql数据库连接
let mysql = require('mysql')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();



obtainTestRouter.get('/test/obtainTest', (req, res) => {
    // 数据库插入数据
    connection.query(`SELECT * from test ORDER BY startTime DESC`, function (error, results, fields) {
        if (error) console.log(error)
        for(result of results){
            result.startTime = transform.transformMinutes(result.startTime)
        }
        res.send({
           code:1,
           message:'查询成功',
           data: results
        })
    })



})

module.exports = obtainTestRouter

