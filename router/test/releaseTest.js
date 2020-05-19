const express = require('express')
const bodyParser = require('body-parser')
const releaseTestRouter = express.Router()
const transform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// mysql数据库连接
let mysql = require('mysql')
const connection = mysql.createConnection(connectionDb.mysqlHost)
connection.connect();

// mongoose数据库连接
let mongoose = require('mongoose');
mongoose.connect(connectionDb.mongodbHost, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
let db = mongoose.connection;

// 表引入
let Test = require('../../mongodb/testSchema')

// 创建application/x-www-form-unlencoded解析器
// releaseTestRouter.use(bodyParser.urlencoded({
//     extended: false
// }))
// releaseTestRouter.use(bodyParser.json())
releaseTestRouter.use(express.json())

releaseTestRouter.post('/test/realeaseTest', bodyParser.json(),(req, res) => {
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    let dataInfo = transform.transformFormat(req.body)
    console.log(dataInfo)
    let sqlInfo = {
        testName: dataInfo.testName,
        startTime: transform.transformMinutes(new Date()),
        endTime: transform.transformChangeMinute(new Date(), dataInfo.time),
        time:dataInfo.time
    }

    let moogooseInfo = {
        testName: dataInfo.testName,
        questions: dataInfo.questions,
    }

    db.on('error', console.error.bind(console, 'connection error:'));

    // 插入数据
    new Test(moogooseInfo).save((err, result) => {
        if (err) {
            console.log('mongoose', err)
            res.send({
                code:1,
                message:"测试名已存在"
            })
        }else{
            console.log(result)
            connection.query(`INSERT INTO test(testName,startTime,endTime,time) VALUES(${JSON.stringify(sqlInfo.testName)},${JSON.stringify(sqlInfo.startTime)},${JSON.stringify(sqlInfo.endTime)},${JSON.stringify(sqlInfo.time)})`, function (error, results, fields) {
                if (error) {
                    console.log('sql', error)
                    res.send({
                        code:1,
                        message:"测试名已存在"
                    })
                } else {
                    console.log(results)
                    res.send({
                        code:2,
                        message:"发布成功",
                        data:dataInfo
                        })
                } //else     
            })
            
        }
        
    })

    
})

module.exports = releaseTestRouter

