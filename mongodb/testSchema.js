const mongoose = require('mongoose');
const connectionDb = require('../common/connectDatabase')
// 可以不需要存在
mongoose.connect(connectionDb.mongodbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

    // 设计表结构，约束数据，不会有脏数据
    var testSchema = mongoose.Schema({
        testName: {
            type: String,
            required: true,
            unique: true
        },
        questions: [
            {
            index:Number,
            selectedtype: String,
            title: String,
            option: Array,
            note: String,
            correctOption: Array,
            score:Number

        }]
    });

let Test = mongoose.model('Test', testSchema)

// Test.find({},(err,result)=>{
//     if(err) console.log(err)
//     console.log(result)
// })

module.exports = Test

   
