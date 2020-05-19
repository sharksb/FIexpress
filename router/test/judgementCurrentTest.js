const express = require('express')

const judgementCurrentTestRouter = express.Router()

const transform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// mysql数据库连接
let mysql = require('mysql')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// 表引入
let TestStudentAnswerCurrent = require('../../mongodb/testStudentAnswerCurrentSchema')

judgementCurrentTestRouter.get('/test/judgementCurrentTest', (req, res) => {
    let idCard = req.query.idCard
    // 数据库插入数据
    let nowtime = new Date().getTime()
    connection.query(`SELECT * from test ORDER BY endTime DESC`, function (error, results, fields) {
        if (error) console.log(error)
        for (result of results) {
            result.startTime = transform.transformMinutes(result.startTime)
            result.endTime = transform.transformMinutes(result.endTime)
        }
        let endTime = new Date(results[0].endTime).getTime()
        if (nowtime > endTime) {
            res.send({
                code: 1,
                message: '测试已结束',
                data: results[0].endTime
            })
        } else {
            TestStudentAnswerCurrent.find({
                    idCard: idCard,
                    tests: {
                        $elemMatch: {
                            testName: results[0].testName
                        }
                    }
                },
                (err, monres) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (monres.length > 0) {
                            res.send({
                                code: 2,
                                message: '您已测试',
                            })
                        } else {
                            res.send({
                                code: 3,
                                message: '测试',
                                data: results[0].testName
                            })
                        }
                    }
                }
            )
        }

    })



})

module.exports = judgementCurrentTestRouter