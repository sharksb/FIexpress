const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const multer  = require('multer');
const transform = require('../../common/transform')
const uploadHomeworkRouter = express.Router()
let upload = multer({dest:'./upload/student/'})
uploadHomeworkRouter.use(bodyParser.json())
const connectionDb = require('../../common/connectDatabase')
// 创建application/x-www-form-unlencoded解析器
uploadHomeworkRouter.use(bodyParser.urlencoded({extended:false}))

const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// 引入上传作业表
const FileHomework = require('../../mongodb/fileHomeworkSchema')

uploadHomeworkRouter.post('/file/uploadHomework',upload.any(),(req,res,next)=>{
    console.log(req.files);
    // let filetype = req.body.type
    // 可以传入IDcard homeworkName
    console.log(req)
    let idCard = req.body.idCard
    let fileName = req.body.fileName
    let des_file = './upload/student/'+req.files[0].originalname
    let uploadFilename = req.files[0].originalname
    fs.readFile(req.files[0].path,(err,data)=>{
        fs.writeFile(des_file,data,(err)=>{
            if(err) {
                console.log(err)
                res.send({
                    code:1,
                    message:"发送成功"
                })
            }
            
            console.log(des_file)
            console.log(idCard,fileName)

            let homeworInfo = {
                homeworkName:fileName,
                handHomeworkName:uploadFilename,
                handHomeworkUrl:des_file,
                isUpload:'true'
            }
            FileHomework.findOneAndUpdate({
                idCard:idCard
            },
            {
                $push: {
                    "fileHomeworks": homeworInfo
                }
            },
            (err,result)=>{
                if(err) {
                    console.log(err)
                }else {
                    console.log(result)
                    res.send({
                        code:2,
                        message:"发送成功"
                    })
                }
            }
            )
        })
    })
})

module.exports = uploadHomeworkRouter