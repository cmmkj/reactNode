const Article = require('./controllers/article');
const Init = require('./controllers/init');
const User = require('./controllers/user');
const config = require('../config');
const jwt = require('express-jwt');

let jwtCheck = jwt({
  secret: config.jwt.secret
});


module.exports = (app) => {
  app.use('/init', Init);
  app.use('/article', jwtCheck, Article);
  app.use('/user', User); //用户管理
}


