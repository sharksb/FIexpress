const express = require('express');
const bodyParser = require('body-parser')
const showFileRouter = express.Router()
const mysql = require('mysql')
const path = require('path')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// 创建application/x-www-form-unlencoded解析器
showFileRouter.use(bodyParser.urlencoded({extended:false}))

var connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();

showFileRouter.use('/upload',express.static(path.join(__dirname, 'upload')))
showFileRouter.get('/file/showFile',(req,res,next)=>{
    connection.query(`select * FROM  file ORDER BY uploadTime DESC`, function (error, results, fields) {
      for(result of results){
          result.file = result.file
          result.uploadtime = tranform.transformDate(result.uploadtime)
      }
       res.send(results)
    })
})

module.exports = showFileRouter


