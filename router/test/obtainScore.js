const express = require('express')
const obtainScoreRouter = express.Router()
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

// 学生答案表引入
let TestStudentsAnswerCurrent = require('../../mongodb/testStudentAnswerCurrentSchema')

// 传输数据使用json格式
obtainScoreRouter.get('/test/obtainScore', (req, res) => {
    let testName = req.query.testName

    // 某个学生某次测试后的内容
    // 数据库插入数据
    db.on('error', console.error.bind(console, 'connection error:'));
    TestStudentsAnswerCurrent.find({
        tests: {
            $elemMatch: {
                testName: testName
            }
        }
    }, (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                code: 1,
                message: '无此测试'
            })
        } else {
            connection.query(`SELECT idcard,username,class from user`, function (error, sqlresults, fields) {
                if (error) {
                    console.log(error)
                } else {
                    let nofindItem = sqlresults
                    let sqlitems = null
                    let findItem = []
                    for (monitem of result) {
                        nofindItem = nofindItem.filter((sqlitem) => {
                            return monitem.idCard != sqlitem.idcard
                        })
                        for (sqlitems of sqlresults) {
                            if (monitem.idCard == sqlitems.idcard) {
                                for (let test of monitem.tests) {
                                    if (test.testName == testName) {
                                        sqlitems.countScore = test.countScore
                                    }
                                }
                                findItem.push(sqlitems)
                                break;
                            }
                        }
                    }
                    for (let noitem of nofindItem) {
                        noitem.countScore = 0
                    }

                    // 合并数组
                    let inforThree = []
                    let inforTwo = []
                    let inforOne = []
                    let allItem = nofindItem.concat(findItem)
                    for (item of allItem) {
                        if (item.class == '信息1601') {
                            inforOne.push({
                                studentName: item.username,
                                studentId: item.idcard,
                                studentSoce: item.countScore
                            })
                        } else if (item.class == '信息1602') {
                            inforTwo.push({
                                studentName: item.username,
                                studentId: item.idcard,
                                studentSoce: item.countScore
                            })
                        } else if (item.class == '信息1603') {
                            inforThree.push({
                                studentName: item.username,
                                studentId: item.idcard,
                                studentSoce: item.countScore
                            })
                        }
                    } //
                    let testScoreDetail = [
                        {
                            className: '信息1601',
                            studentCount: inforOne.length,
                            studentInfor: inforOne
                        },
                        {
                            className: '信息1602',
                            studentCount: inforTwo.length,
                            studentInfor: inforTwo
                        },
                        {
                            className: '信息1603',
                            studentCount: inforThree.length,
                            studentInfor: inforThree
                        },
                    ]
                    // console.log(testScoreDetail)
                    res.send({
                        code: 2,
                        message: '查询成功',
                        data:testScoreDetail
                    })

                }
            })

        }
    })
})

module.exports = obtainScoreRouter