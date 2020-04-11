const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const aws = require('aws-sdk');
const s3 = new aws.S3();


const postSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

postSchema.pre('save',function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

postSchema.pre('remove',function(){
    if(process.env.STORAGE_TYPE === 's3'){
        
        return s3.deleteObject({
            Bucket:process.env.AWS_BUKET_NAME,
            Key:this.key
        }).promise();
        
    }else{
        return promisify(fs.unlink)(
            path.resolve(__dirname,'..','..','temp','uploads',this.key)
        );
    }
})

module.exports = mongoose.model('files',postSchema)