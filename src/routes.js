const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const post = require('./controller/post');

routes.post('/posts',multer(multerConfig).single("file"), post.create);
routes.get('/posts', post.list);
routes.delete('/posts/:id', post.remove);

module.exports = routes;