const express = require('express')
const addStudentRouter = express.Router()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
addStudentRouter.use(bodyParser.json())
addStudentRouter.use(bodyParser.urlencoded({
    extended: false
}))

const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


addStudentRouter.post('/user/addStudent', (req, res) => {
    let requestBody = tranform.transformFormat(req.body)
    let idcard = requestBody.studentId
    let name = requestBody.studentName
    let clasId = requestBody.classId
    connection.query(`INSERT INTO information(idcard,name,type,class) VALUES(${idcard},${JSON.stringify(name)},"学生",${JSON.stringify(clasId)})`, function (error, results) {
        if(error){
            console.log(error)
            res.send({
                code:1,
                message:"添加失败"
            })
        }else {
            console.log(results)
            res.send({
                code:2,
                message:"添加成功"
            })
        }                 
 
    })
   

})


module.exports = addStudentRouter