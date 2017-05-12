const Note = require('./controllers/note');
const Init = require('./controllers/init');
const User = require('./controllers/user');
const config = require('../config');



module.exports = (app) => {
  app.use('/init', Init);
  app.use('/v1/note', Note);
  app.use('/v1/user', User); //用户管理
}


