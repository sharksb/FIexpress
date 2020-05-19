// console.log(__filename);
// console.log(__dirname);

// console
// console.info("程序开始执行：")
// var counter = 10;
// console.log("计数：%d",counter);

// console.time("获取数据");

// console.log("do other thing")

// console.timeEnd("获取数据")

// console.log("程序执行完毕")

// process
// process.on('exit',function(code){
//     setTimeout(function(){
//        console.log("该代码不会执行")
//     },0)

//     console.log('退出码',code)
// })

// 输出到终端
process.stdout.write("hello world"+"\n");

// 通过参数读取
process.argv.forEach(function(val,index,array){
   console.log(index+':'+val)
})

// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform)

