const Note = require('./controllers/note');
const Init = require('./controllers/init');
const User = require('./controllers/user');
const config = require('../config');



module.exports = (app) => {
  app.use('/init', Init);
  app.use('/note', Note);
  app.use('/user', User); //用户管理
}


