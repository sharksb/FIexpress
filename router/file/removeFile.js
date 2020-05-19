const fs = require('fs')
const express = require('express')
const mysql = require('mysql')
const multer = require('multer')
const removeFileRouter = express.Router()
let upload = multer({
    dest: './upload/'
})
const connectionDb = require('../../common/connectDatabase')
const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();

removeFileRouter.post('/file/remove', upload.any(), (req, res, next) => {
    let filename = req.files[0].originalname
    fs.unlinkSync('./upload/' + filename);
    connection.query(`DELETE  from file  WHERE file =${JSON.stringify(filename)}`, function (error, results, fields) {
        if(error){
            console.log(error)
            res.send({
                code:1,
                message:"删除失败"
            })
        } else {
            console.log(results)
        }
    })
    res.send({
        code:1,
        data:"删除成功"
    })
})

module.exports = removeFileRouter