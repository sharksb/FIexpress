const express = require('express')
const obtainStasticRouter = express.Router()
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
obtainStasticRouter.get('/test/obtainStastic', (req, res) => {
    let testName = req.query.testName


    // 所有题目的集合
    let questions = []
    // 某个学生某次测试后的内容
    // 数据库插入数据
    db.on('error', console.error.bind(console, 'connection error:'));
    TestStudentsAnswerCurrent.find({
        tests: {
            $elemMatch: {
                testName: testName
            }
        }
    }, (err, results) => {
        if(err) {
            console.log(err)
        }else {
            console.log(results)
            for(let items of results){
               console.log(items)//每一个学生
               for(let testitem of items.tests){
                   console.log(testitem)//里面的测试
                   if(testitem.testName ==testName){
                       for(let question of testitem.questions){
                           
                       }
                   }
               }
            }
        }
    })
})

module.exports = obtainStasticRouter