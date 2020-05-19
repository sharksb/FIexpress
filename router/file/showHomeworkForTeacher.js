const express = require('express');
const bodyParser = require('body-parser')
const showHomeworkForTeacherRouter = express.Router()
const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// 创建application/x-www-form-unlencoded解析器
showHomeworkForTeacherRouter.use(bodyParser.urlencoded({
    extended: false
}))

var connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


showHomeworkForTeacherRouter.get('/file/showHomeworkForTeacher', (req, res, next) => {
    connection.query(`select * FROM  homeworkfile ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
       if(error){
           console.log(error)
           res.send({
               code:1,
               message:"查询失败"
           })
       }else {
        let filelist = [] 
        let sqlres =null
        for(sqlres of sqlresults){
           filelist.push({
            homeworkNmae:sqlres.homeFile
           })
        }
        res.send(filelist)
       }
    })
})

module.exports = showHomeworkForTeacherRouter