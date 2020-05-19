const express = require('express')
const path = require('path')
const registerRouter = express.Router()
const bodyParser = require('body-parser')
const fs = require('fs')
const mysql = require('mysql')
const mongoose = require('mongoose');
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
registerRouter.use(bodyParser.json())
registerRouter.use(bodyParser.urlencoded({
    extended: false
}))

// 引入测试表
let TestStudentsAnswer = require('../../mongodb/testStudentAnswerSchema')

// 当前测试表引入
let TestStudentAnswerCurrent = require('../../mongodb/testStudentAnswerCurrentSchema')

// 引入交作业表
let FileHomework = require('../../mongodb/fileHomeworkSchema')

const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();
mongoose.connect(connectionDb.mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

registerRouter.post('/user/register', (req, res) => {
    let requestBody = tranform.transformFormat(req.body)
    let idCard = requestBody.idCard
    let telephone = requestBody.telephone
    let password = requestBody.password
    let idCards = []
    connection.query('SELECT idCard from information', function (error, results, fields) {
        if (error) throw error;
        for (resule of results) {
            idCards.push(resule.idCard)
        }
        console.log(idCard)
        // 学号是否存在
        let existIdcard = idCards.filter((item) => {
            return item == idCard
        })
        if (existIdcard.length == 0) {
            console.log(existIdcard)
            res.send({
                code: 1,
                message: "学号不存在"
            })
        } else {
            connection.query(`SELECT * from information WHERE idCard=${idCard}`, function (error, results, fields) {
                if (error) console.log(error)
                console.log(results[0])

                connection.query(`INSERT INTO user(idCard,username,type,class,password,telephone) VALUES(${results[0].idcard},${JSON.stringify(results[0].name)},${JSON.stringify(results[0].type)},${JSON.stringify(results[0].class)},${JSON.stringify(password)},${JSON.stringify(telephone)})`, function (error, results) {
                    if (error) {
                        console.log(error)
                        res.send({
                            code: 2,
                            message: "学号已注册"
                        })
                    } else {
                        connection.query(`SELECT idCard,username,type,class,telephone from user WHERE idCard=${idCard}`, function (error, results, fields) {
                            res.send({
                                code: 3,
                                message: "注册成功",
                                data: results[0]
                            })

                            // 测试表注册
                            new TestStudentsAnswer({
                                idCard: idCard,
                                tests: [{
                                    testName:''
                                }]
                            }).save((err, result) => {
                                if (err) {
                                    console.log(err)
                                }else{
                                    console.log(result)
                                } 
                            })

                            // 当前测试表注册
                            new TestStudentAnswerCurrent({
                                idCard: idCard,
                                tests: []
                            }).save((err, result) => {
                                if (err) {
                                    console.log(err)
                                }else{
                                    console.log(result)
                                } 
                            })

                            // 上传作业注册
                            new FileHomework({
                                idCard: idCard,
                                fileHomeworks: []
                            }).save((err, result) => {
                                if (err) {
                                    console.log(err)
                                }else{
                                    console.log(result)
                                } 
                            })
    
                        })


                    }


                })
            })
        }
    });

})


module.exports = registerRouter