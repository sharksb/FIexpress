const express = require('express')
const app = express()
const path = require('path')

// 登录
const loginRouter = require('./router/user/login')

// 注册
const registerRouter = require('./router/user/register')

// 修改密码
const resetPasswordRouter = require('./router/user/resetPassword')

// 添加一个学生信息
const addStudentRouter = require('./router/user/addStudent')

// 添加新闻
const addInformationRouter = require('./router/user/addInformation')

// 获取添加的新闻
const obtainInformationRouter = require('./router/user/obtainInformatiom')

// 上传文件
const uploadFileRouter = require('./router/file/uploadFile')

// 展示下载文件
const showFileRouter = require('./router/file/showFile')

// 显示作业
const showHomeworkRouter = require('./router/file/showHomework')

// 显示作业对老师
const showHomeworkForTeacherRouter = require('./router/file/showHomeworkForTeacher')

// 上传作业
const uploadHomeworkRouter = require('./router/file/uploadHomework')

// 显示作业的细节
const showHomeworkDetailRouter = require('./router/file/showHomeworkDetail')


// 删除文件
const removeFileRouter = require('./router/file/removeFile')

// 发布测试
const releaseTestRouter = require('./router/test/releaseTest')

// 获取一个测试
const obtainOneTestRouter = require('./router/test/obtainOneTest')

// 获取所有测试信息
const obtainTestRouter = require('./router/test/obtainTest')

// 将某个学生测试后的结果传入数据库
const sendOneStudentAnswerRouter = require('./router/test/sendOneStudentAnswer')

// 将当前某个学生测试后的结果传入数据库
const sendOneStudentAnswerCurrentRouter = require('./router/test/sendOneStudentAnswerCurrent')

// 获取某个学生测试的结果
const obtainOneStudentAnswerRouter = require('./router/test/obtainOnestudentAnswer')

// 判断是否是当前测试
const judgementCurrentTestRouter = require('./router/test/judgementCurrentTest')

// 获取当前某个学生的测试结果
const obtainOneStudentCurrentAnswerRouter = require('./router/test/obtainOneStudentCurrentAnswer')

// 获取所有学生测试结果
const obtainScoreRouter = require('./router/test/obtainScore')

// 统计所有学生的测试结果
const obtainStasticRouter = require('./router/test/obtainStastic')

// 论坛发布消息
const writePlatformRouter = require('./router/platform/writePlatform')

// 论坛展示消息
const showPlatformRouter = require('./router/platform/showPlatform')

// 论坛展示某个具体的消息
const showPlatformDetailRouter = require('./router/platform/showPlatformDetail')

// 写入具体的消息
const writePlatformDetailRouter = require('./router/platform/writePlatformDetail')

// 获取所有学生的信息
const obtainAllStudentRouter = require('./router/platform/obtainAllStudent')

// 发送消息
const sendMessageRouter =require('./router/platform/sendMessage')

// 获取消息
const obtainMessageRouter = require('./router/platform/obtainMessage')

// 某个人的消息
const showOneMessageRouter = require('./router/platform/showOneMessage')

// 老师发送消息
const sendTeacherRouter = require('./router/platform/sendTeacher')

// 查看老师发送的消息
const obtainTeacherRouter = require('./router/platform/obtainTeacher')

// 计算老师的消息数
const countTeacherRouter = require('./router/platform/countTeacher')

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // 设置服务器支持的所有跨域请求的方法
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method.toLowerCase() == 'options') {
        res.sendStatus(200) // 让options尝试请求快速结束
    } else {
        next();
    }
})
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(loginRouter)
app.use(registerRouter)
app.use(resetPasswordRouter)
app.use(addStudentRouter)
app.use(addInformationRouter)
app.use(obtainInformationRouter)
app.use(uploadFileRouter)
app.use(showFileRouter)
app.use(removeFileRouter)
app.use(releaseTestRouter)
app.use(obtainOneTestRouter)
app.use(obtainTestRouter)
app.use(sendOneStudentAnswerRouter)
app.use(obtainOneStudentAnswerRouter)
app.use(showHomeworkRouter)
app.use(uploadHomeworkRouter)
app.use(showHomeworkForTeacherRouter)
app.use(showHomeworkDetailRouter)
app.use(judgementCurrentTestRouter)
app.use(obtainOneStudentCurrentAnswerRouter)
app.use(sendOneStudentAnswerCurrentRouter)
app.use(obtainScoreRouter)
app.use(obtainStasticRouter)
app.use(writePlatformRouter)
app.use(showPlatformRouter)
app.use(showPlatformDetailRouter)
app.use(writePlatformDetailRouter)
app.use(obtainAllStudentRouter)
app.use(sendMessageRouter)
app.use(obtainMessageRouter)
app.use(showOneMessageRouter)
app.use(sendTeacherRouter)
app.use(obtainTeacherRouter)
app.use(countTeacherRouter)

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(8081, () => {
    console.log('服务器已启动')
})