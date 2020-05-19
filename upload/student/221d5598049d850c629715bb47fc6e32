// 声明所有的模块
var http = require('http')
var fs = require('fs')

// 简写
http.createServer(function(req,res){
    var url = req.url
    if(url === '/') {
        fs.readFile('input1.txt',function(err,data){
            if(err){
                return res.end('404 NOT FOUND')
            }
            res.end(data)
        })
    }
}).listen(3000,function(){
    console.log("runnning....")
})

// 只要在网页中添加了外链，就会产生请求

// 我们为了方便的童统一处理一些静态资源，所以约定，所有的静态资源都存放在
// public文件夹中
// 则我们可以直接把请求路径写做文件路径  url.indexOf('/public/' === 0 )
// 可以直接读取文件 fs.readFile('.'+url)
