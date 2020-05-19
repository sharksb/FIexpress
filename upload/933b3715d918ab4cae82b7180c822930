// 核心模块====http

// 1。注册模块
 const http = require("http");

//  2.使用http.createServer

// 创建一个Server实例
var server = http.createServer();

// 处理数据，发送数据，处理请求,客户端请求是，会自动触发request请求事件
// 然后执行执行第二个参数，回调处理
server.on('request',function(){
  console.log('收到客户端的请求了')
})

// 3.绑定端口号，启动服务器
server.listen(3000,function(){
    console.log("服务器启动成功了")
})


