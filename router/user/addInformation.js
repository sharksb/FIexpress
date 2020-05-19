const express = require('express')
const addInformationRouter = express.Router()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const tranform = require('../../common/transform')
const connectionDb = require('../../common/connectDatabase')
addInformationRouter.use(bodyParser.json())
addInformationRouter.use(bodyParser.urlencoded({
    extended: false
}))

const connection = mysql.createConnection(connectionDb.mysqlHost)

connection.connect();


addInformationRouter.post('/user/addInformation', (req, res) => {
    let requestBody = tranform.transformFormat(req.body)
    let title = JSON.stringify(requestBody.title)
    let content = JSON.stringify(requestBody.content)
    let source = JSON.stringify(requestBody.source)
    let linkUrl = JSON.stringify(requestBody.linkUrl)
    let addTime = JSON.stringify(tranform.transformMinutes(new Date()))
    connection.query(`INSERT INTO news(title,content,source,linkUrl,addTime) VALUES(${title},${content},${source},${linkUrl},${addTime})`, function (error, results) {
        if (error) {
            console.log(error)
            res.send({
                code: 1,
                message: "添加失败"
            })
        } else {
            console.log(results)
            res.send({
                code: 2,
                message: "添加成功"
            })
        }

    })


})


module.exports = addInformationRouter