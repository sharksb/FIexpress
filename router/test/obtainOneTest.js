const express = require('express')

const obtainOneTestRouter = express.Router()

const transform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// mysql数据库连接
let mysql = require('mysql')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();
let mongoose = require('mongoose');
// 可以不需要存在
mongoose.connect(connectionDb.mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
let db = mongoose.connection;

// 表引入
let Test = require('../../mongodb/testSchema')

obtainOneTestRouter.get('/test/obtainOneTest', (req, res) => {
    let  testname = req.query.testName
    // 数据库插入数据
    Test.find({
        "testName":testname
    }, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                code:1,
                message:"测试不存在"
            })
        } else {
            console.log('res',result)
            if(result.length == 0){
                res.send({
                    code:1,
                    message:"测试不存在"
                })
            }else {
                console.log(result[0].questions)
                let testInfo = null
                let questions = result[0].questions
                let testName = result[0].testName
                connection.query(`SELECT * from test WHERE testName=${JSON.stringify(testname)}`, function (error, results, fields) {
                    if (error) console.log(error)
                    let time = results[0].time
                    let startTime = transform.transformMinutes( results[0].startTime)
                    let endTime = transform.transformMinutes( results[0].endTime)
                    testInfo = {
                        testName,
                        questions,
                        time,
                        startTime,
                        endTime
                    }
                    res.send({
                       code:2,
                       message:'查询成功',
                       data: testInfo
                    })
                })
            }
           
        }

    })


})

module.exports = obtainOneTestRouter

