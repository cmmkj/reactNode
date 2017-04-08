const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const config = require('../../config');

let jwtCheck = jwt({
  secret: config.jwt.secret
});

router.post('/addNote', jwtCheck, (req, res, next) => {
  let newNote = req.body;
  let Note = req.getModel('note');
  newNote.date = newNote.date || new Date();
  Note.create(newNote).then(doc => {
    console.log('笔记已经成功写入数据库！！');
    console.log(doc);
    Note.find({}).exec().then(notes => {
      res.json(notes);
    })
  })
})

router.delete('/deleteNote', jwtCheck, (req, res, next) => {
  let date = req.body.date;
  let Note = req.getModel('note');
  Note.deleteOne({date: date}).then(() => {
    console.log('笔记已经删除');
    Note.find({}, (err, notes) => {
      res.json(notes);
    });
  })
})

router.get('/:noteid', (req, res, next) => {
  let noteid = req.params.noteid;
  let Note = req.getModel('note');
  Note.findById(noteid).then(doc => {
    console.log('使用id查找成功');
    console.log(doc);
    res.json({
      note:doc
    });
  });
})

module.exports = router;

