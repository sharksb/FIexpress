let mongoose = require('mongoose');
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
let TestStudentsAnswerCurrentSchema = mongoose.Schema({
    idCard: {
        type: Number,
        required: true,
        unique: true
    },
    tests: [{
        testName: {
            type: String,
        },
        questions: [{
            title: String,
            index: Number,
            correctOption: Array,
            yourAnswer: Array,
            srcore:Number
        }],
        countScore:{
            type:Number
        },
        isTest:{
            type:Boolean
        }
    }]
});



let TestStudentsAnswerCurrent = mongoose.model('TestStudentsAnswerCurrent', TestStudentsAnswerCurrentSchema)
// TestStudentsAnswerCurrent.find({},(err,result)=>{
//     if(err) console.log(err)
//     console.log(result)
// })
module.exports = TestStudentsAnswerCurrent