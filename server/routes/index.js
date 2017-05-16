const Note = require('./controllers/note');
const Init = require('./controllers/init');
const User = require('./controllers/user');
const Comment = require('./controllers/comment')
const config = require('../config');
const jwt = require('express-jwt');


let jwtCheck = jwt({
  secret: config.jwt.secret
});

module.exports = (app) => {
  app.get('/init', Init.notesList);
  // note
  app.post('/v1/note/addNote', jwtCheck, Note.addNote);
  app.delete('/v1/note/deleteNote', jwtCheck, Note.deleteNote)
  app.get('/v1/note/:noteid', Note.getNote)
  app.get('/v1/note/user/notes', jwtCheck, Note.userNotes)

  // user
  app.post('/v1/user/createUser', User.createUser)
  app.post('/v1/user/login', User.login)
  
  // comment
  app.post('/v1/user/comment', jwtCheck, Comment.createComment)
  app.get('/v1/note/comments/:noteid', Comment.findNoteComments)
}


