const Post = require('../models/posts');
module.exports ={
    create:async (req,res)=>{
        const {originalname:name,size,key, location: url = ''} = req.file;
        const post = await Post.create({
            name,
            size,
            key,
            url
        })
        return res.json(post);
    },
    list:async (req,res)=>{
        const resp = await Post.find();
        return res.json(resp);
    },
    remove:async (req,res)=>{
        const post = await Post.findById(req.params.id);
        await post.remove();
        return res.send();
    }
}