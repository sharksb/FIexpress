const express = require('express')
const bodyParser = require('body-parser')
const sendOneStudentAnswerCurrentRouter = express.Router()
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

// 创建application/x-www-form-unlencoded解析器
sendOneStudentAnswerCurrentRouter.use(bodyParser.urlencoded({extended:false}))
sendOneStudentAnswerCurrentRouter.use(bodyParser.json())

// 学生答案表引入
let TestStudentAnswerCurrent = require('../../mongodb/testStudentAnswerCurrentSchema')

// 测试表引入
let Test = require('../../mongodb/testSchema')

// 传输数据使用json格式
sendOneStudentAnswerCurrentRouter.post('/test/sendOneStudentAnswerCurrent', (req, res) => {
    let dataInfo = req.body
    // console.log(dataInfo)
    let idCard = dataInfo.idCard
    // let testInfor = dataInfo.testInfor
    let testName = dataInfo.testName

    let questions = dataInfo.questions


    // 某个学生某次测试后的内容
    // 数据库插入数据
    db.on('error', console.error.bind(console, 'connection error:'));
    Test.find(
        {
          testName: testName
        },(err,result)=>{
        if(err){
            console.log(err)
            res.send({
                code:1,
                message:'无此测试'
            })
        }else {
            for(index in questions){
                questions[index].correctOption = result[0].questions[index].correctOption
                questions[index].srcore = result[0].questions[index].score
            }
            console.log(questions)
            let testInfor = {
                testName:testName,
                questions:questions,
                countScore:0,
                isTest:true
             }
             TestStudentAnswerCurrent.update({
                idCard: idCard
            }, {
                $set: {
                    tests: testInfor,
                }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({
                        code:2,
                        message:"提交失败"
                    })
                } else {
                    res.send({
                        code:3,
                        message:"提交成功",
                    })
                }
            });
        }
    })


})

module.exports = sendOneStudentAnswerCurrentRouter


// 未在路由中注册
//