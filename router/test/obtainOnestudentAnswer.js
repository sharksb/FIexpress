const express = require('express')
const bodyParser = require('body-parser')
const obtainOneStudentAnswerRouter = express.Router()
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
obtainOneStudentAnswerRouter.use(bodyParser.urlencoded({
    extended: false
}))
obtainOneStudentAnswerRouter.use(bodyParser.json())

// 表引入
let TestStudentsAnswer = require('../../mongodb/testStudentAnswerSchema')

// 传输数据使用json格式
obtainOneStudentAnswerRouter.get('/test/obtainOneStudentAnswer', (req, res) => {
    let dataInfo = req.query
    // console.log(dataInfo)
    let idCard = dataInfo.idCard
    let testName = dataInfo.testName
    // console.log(testName)
    // 某个学生某次测试后的内容

    // 数据库插入数据
    db.on('error', console.error.bind(console, 'connection error:'));
    // console.log(idCard)
    TestStudentsAnswer.find({
        idCard: idCard
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            let test = result[0].tests.filter((item, index) => {
                return item.testName == testName
            })
            if (test.length == 0) {
                res.send({
                    code: 1,
                    message: "没有参加这次测试"
                })
            } else {
                let question = null
                let countScore = 0
                let count = 0
                for (question of test[0].questions) {
                    let yourans = null
                    let corrans = null
                    let corrcet = false
                    if (question.correctOption.length == 1) {
                        // 单选，判断
                        for (yourans of question.yourAnswer) {
                            for (corrans of question.correctOption) {
                                if (yourans == corrans) {
                                    corrcet = true
                                    break
                                } else {
                                    corrcet = false
                                }
                            }
                        }
                    }else{
                        if(question.correctOption.length == question.yourAnswer.length){
                            for(corrans of question.correctOption){
                                let isEquals = question.yourAnswer.some((item)=>{
                                   return item == corrans
                                })
                                if(isEquals==false){
                                    corrcet = isEquals
                                    break
                                }else {
                                    corrcet = true
                                }
                               }
                        }else{
                            corrcet = false
                        }

                    }
                    // 判断
                    if (corrcet) {
                        countScore += question.srcore
                        count++;
                    }

                }
                let ranking = (count / test[0].questions.length * 100)
                res.send({
                    code: 2,
                    mesage: "已测试",
                    data: test[0],
                    rank: {
                        countScore: countScore,
                        ranking: ranking
                    }
                })
            }//
        }
    })
})

module.exports = obtainOneStudentAnswerRouter


// 某个学生回答完的试卷进行提交
// ATTENTION：需要在注册时候，写入代码，在注册时候就把这个库中的idCard输入