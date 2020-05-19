const express = require('express');
const bodyParser = require('body-parser')
const showPlatformDetailRouter = express.Router()
const mysql = require('mysql')
const path = require('path')
const connectionDb = require('../../common/connectDatabase')

// 创建application/x-www-form-unlencoded解析器
showPlatformDetailRouter.use(bodyParser.urlencoded({
    extended: false
}))

var connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();

const mongoose = require('mongoose');
// 可以不需要存在
mongoose.connect(connectionDb.mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

let db = mongoose.connection;


// 引入论坛消息详情
let platformDetail = require('../../mongodb/platformDetailSchema')

showPlatformDetailRouter.get('/paltform/showPlatformDetail', (req, res, next) => {
    let username = req.query.username
    let title = req.query.title

    platformDetail.find({
       username:username,
       title:title
    },
    (err,result)=>{
        if(err){
            console.log(err)
        }else {
            console.log(result)
            res.send({
                code:2,
                message:"查询成功",
                data:result
            })
        }
    }
    )
})

module.exports = showPlatformDetailRouter