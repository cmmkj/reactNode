const Article = require('./controllers/article');
const Init = require('./controllers/init');
const User = require('./controllers/user');
const config = require('../config');



module.exports = (app) => {
  app.use('/init', Init);
  app.use('/article', Article);
  app.use('/user', User); //用户管理
}


