var express = require('express')
var path = require('path')
var app = express();

app.get('/login',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.sendFile(path.join(__dirname,'./json','login.json'))
})

var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port
    console.log(host,port)
})