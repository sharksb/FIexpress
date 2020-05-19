const express = require('express');
const bodyParser = require('body-parser')
const showHomeworkDetailRouter = express.Router()
const mysql = require('mysql')
const path = require('path')
const connectionDb = require('../../common/connectDatabase')

// 创建application/x-www-form-unlencoded解析器
showHomeworkDetailRouter.use(bodyParser.urlencoded({
    extended: false
}))

var connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();

const mongoose = require('mongoose');
// 可以不需要存在
mongoose.connect(connectionDb.mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

let db = mongoose.connection;


// 引入交作业表
let FileHomework = require('../../mongodb/fileHomeworkSchema')

showHomeworkDetailRouter.get('/file/showHomeworkDetail', (req, res, next) => {
    let homeworkName = req.query.filename

    FileHomework.find({
        fileHomeworks: {
            $elemMatch: {
                homeworkName: homeworkName
            }
        }
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (result.length == 0) {
                connection.query(`SELECT idcard,username,class from user`, function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        res.send({
                            code: 1,
                            message: '查询失败',
                        })
                    } else {
                        let inforThree = []
                        let inforTwo = []
                        let inforOne = []
                        let result = null
                        for (result of results) {
                            if (result.class == '信息1601') {
                                inforOne.push({
                                    studentName: result.username,
                                    studentId: result.idcard
                                })
                            } else if (result.class == '信息1602') {
                                inforTwo.push({
                                    studentName: result.username,
                                    studentId: result.idcard
                                })
                            } else if (result.class == '信息1603') {
                                inforThree.push({
                                    studentName: result.username,
                                    studentId: result.idcard
                                })
                            }
                        }
                        let nosubmitHomework = [{
                                className: '信息1601',
                                nosubmitCount: inforOne.length,
                                studentInfor: inforOne
                            },
                            {
                                className: '信息1602',
                                nosubmitCount: inforTwo.length,
                                studentInfor: inforTwo
                            },
                            {
                                className: '信息1603',
                                nosubmitCount: inforThree.length,
                                studentInfor: inforThree
                            },

                        ]
                        let submitHomework = []
                        res.send({
                            code: 2,
                            message: '查询成功',
                            data: {
                                submitHomework: submitHomework,
                                nosubmitHomework: nosubmitHomework
                            }
                        })
                    }
                })

            } else {
                connection.query(`SELECT idcard,username,class from user`, function (error, sqlresults, fields) {
                    if (error) {
                        res.send({
                            code: 1,
                            message: '查询失败',
                        })
                    } else {
                        // 未提交作业的人
                        let nofindItem = sqlresults

                        // 已提交作业的人
                        let findItem = []
                        let monitem = null;
                        let sqlitems = null;
                        for (monitem of result) {
                            nofindItem = nofindItem.filter((sqlitem) => {
                                return monitem.idCard != sqlitem.idcard
                            })
                            for (sqlitems of sqlresults){
                                console.log(sqlitems.idcard)
                                if( monitem.idCard == sqlitems.idcard){
                                    console.log(';;;;')
                                    console.log(monitem)
                                    for(let fileHomeworks of monitem.fileHomeworks){
                                        if(fileHomeworks.homeworkName == homeworkName){
                                            sqlitems.stuUrl = fileHomeworks.handHomeworkUrl
                                        }
                                    }
                                    findItem.push(sqlitems)
                                    break;
                                }
                                console.log(findItem)
                            }
                           
                        }
                      
                        // 对未交作业的学生进行梳理
                        let inforThree = []
                        let inforTwo = []
                        let inforOne = []
                        let nofindStudent = null
                        for (nofindStudent of nofindItem) {
                            if (nofindStudent.class == '信息1601') {
                                inforOne.push({
                                    studentName: nofindStudent.username,
                                    studentId: nofindStudent.idcard
                                })
                            } else if (nofindStudent.class == '信息1602') {
                                inforTwo.push({
                                    studentName: nofindStudent.username,
                                    studentId: nofindStudent.idcard
                                })
                            } else if (nofindStudent.class == '信息1603') {
                                inforThree.push({
                                    studentName: nofindStudent.username,
                                    studentId: nofindStudent.idcard
                                })
                            }
                        }//
                        let nosubmitHomework = [{
                            className: '信息1601',
                            nosubmitCount: inforOne.length,
                            studentInfor: inforOne
                        },
                        {
                            className: '信息1602',
                            nosubmitCount: inforTwo.length,
                            studentInfor: inforTwo
                        },
                        {
                            className: '信息1603',
                            nosubmitCount: inforThree.length,
                            studentInfor: inforThree
                        },
                    ]
                   

                    // 对已交作业的学生进行处理
                    let hasinforThree = []
                    let hasinforTwo = []
                    let hasinforOne = []
                    let findStudent = null
                    for (findStudent of findItem) {
                        if (findStudent.class == '信息1601') {
                            hasinforOne.push({
                                studentName: findStudent.username,
                                studentId: findStudent.idcard,
                                stuUrl:findStudent.stuUrl
                            })
                        } else if (findStudent.class == '信息1602') {
                            hasinforTwo.push({
                                studentName: findStudent.username,
                                studentId: findStudent.idcard,
                                stuUrl:findStudent.stuUrl
                            })
                        } else if (findStudent.class == '信息1603') {
                            hasinforThree.push({
                                studentName: findStudent.username,
                                studentId: findStudent.idcard,
                                stuUrl:findStudent.stuUrl
                            })
                        }
                    }//
                    let submitHomework = [{
                        className: '信息1601',
                        submitCount: hasinforOne.length,
                        studentInfor: hasinforOne
                    },
                    {
                        className: '信息1602',
                        submitCount: hasinforTwo.length,
                        studentInfor: hasinforTwo
                    },
                    {
                        className: '信息1603',
                        submitCount: hasinforThree.length,
                        studentInfor: hasinforThree
                    },
                ]
                res.send({
                    code: 2,
                    message: '查询成功',
                    data: {
                        submitHomework: submitHomework,
                        nosubmitHomework: nosubmitHomework
                    }
                })
                        
                    }
                })

            }
        }
    })
})

module.exports = showHomeworkDetailRouter