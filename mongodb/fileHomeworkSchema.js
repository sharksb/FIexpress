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
    let fileHomeworkScheme = mongoose.Schema({
        idCard: {
            type: Number,
            required: true,
            unique: true
        },
        fileHomeworks: [
            {
            homeworkName:String,
            handHomeworkName:String,
            handHomeworkUrl:String,
            isUpload:String
          }
    ]
    });

let FileHomework = mongoose.model('FileHomework', fileHomeworkScheme)


module.exports = FileHomework

   
