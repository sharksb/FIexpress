const express = require('express');
const bodyParser = require('body-parser')
const showHomeworkRouter = express.Router()
const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')

// 创建application/x-www-form-unlencoded解析器
showHomeworkRouter.use(bodyParser.urlencoded({
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

// 引入交作业表
let FileHomework = require('../../mongodb/fileHomeworkSchema')

showHomeworkRouter.get('/file/showHomework', (req, res, next) => {
    let idCard = req.query.idCard
    connection.query(`select * FROM  homeworkfile ORDER BY uploadTime DESC`, function (error, sqlresults, fields) {
       
        for(sqlres of sqlresults){
            sqlres.uploadTime = tranform.transformMinutes(sqlres.uploadTime)
        }
        console.log(sqlresults)
        FileHomework.find({
            idCard: idCard
        }, (err, monresult) => {
            if (err) console.log(err)
            // console.log(monresult)
            console.log(monresult)
            let monfileHomeworks = monresult[0].fileHomeworks
            console.log(monfileHomeworks)
            let sendData = []
            if (monfileHomeworks.length == 0) {
                res.send(sqlresults)
            } else {
                for (sqlres of sqlresults) {
                    for (monres of monfileHomeworks) {
                        console.log('sql',sqlres)
                        console.log('monres',monres)
                        if(sqlres.homeFile == monres.homeworkName){
                            sqlres.isUpload = 'true'
                            break;
                        }
                    }
                
                }
                console.log(sqlresults)
                res.send(sqlresults)
            }

           
        })
    })
})

module.exports = showHomeworkRouter