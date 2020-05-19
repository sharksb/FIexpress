var fs = require('fs');
var express = require('express');
const bodyParser = require('body-parser')
var multer  = require('multer');
var uploadFile = express()
const mysql = require('mysql')
var path = require('path')

var upload = multer({dest:'./upload/'})

// 创建application/json解析器
const jsonParser = bodyParser.json()

// 创建application/x-www-form-unlencoded解析器
uploadFile.use(bodyParser.urlencoded({extended:false}))

var connection = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'root',
    database:'lttest'
})

connection.connect();

uploadFile.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  next();
}) 

uploadFile.use('/upload',express.static(path.join(__dirname, 'upload')))
uploadFile.get('/download',(req,res,next)=>{
    connection.query(`select * FROM  file`, function (error, results, fields) {
      for(result of results){
          result.file = result.file.toString()
      }
       res.send(results)
    })
})

uploadFile.listen(8083,()=>{
    console.log("服务器启动了")
})