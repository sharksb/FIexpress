const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const multer  = require('multer');
const transform = require('../../common/transform')
const uploadRouter = express.Router()
let upload = multer({dest:'./upload/'})
uploadRouter.use(bodyParser.json())
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
uploadRouter.use(bodyParser.urlencoded({extended:false}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

uploadRouter.post('/file/upload',upload.any(),(req,res,next)=>{
    console.log(req.files);
    let filetype = req.body.type
    console.log(filetype)
    var des_file = './upload/'+req.files[0].originalname;
    fs.readFile(req.files[0].path,(err,data)=>{
        fs.writeFile(des_file,data,(err)=>{
            if(err) console.log(err)
            let time = transform.transformMinutes(new Date())
            connection.query(`INSERT INTO file(file,uploadtime,fileUrl) VALUES(${JSON.stringify(req.files[0].originalname)},${JSON.stringify(time)},${JSON.stringify(des_file)})`, function (error, results, fields) {
                if(error) {console.log(error)
                  res.send({
                      code:1,
                      message:"文件已发送过"
                  })
                }else{
                    res.send({
                       code:2,
                       message:"发送成功" ,
                       filename:req.files[0].originalname
                    })
                    if(filetype == "homeWork"){
                        console.log("enter")
                        connection.query(`INSERT INTO homeworkfile(homeFile,uploadTime,fileUrl) VALUES(${JSON.stringify(req.files[0].originalname)},${JSON.stringify(time)},${JSON.stringify(des_file)})`, function (error, results, fields) {
                            if(err) {
                                console.log(err)
                            }else {
                                connection.query(` UPDATE homeworkfile SET isUpload = 'false' WHERE homeFile = ${JSON.stringify(req.files[0].originalname)}`, function (error, results, fields) {
                                   if(err) console.log(err)
                                   console.log(results)
                                })
                               
                            }
                            
                            console.log(results)
                        })
                    }
                }
            })
        })
    })
})

module.exports = uploadRouter