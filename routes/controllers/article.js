const express = require('express');
const router = express.Router();

router.post('/addNote', (req, res, next) => {
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

router.delete('/deleteNote', (req, res, next) => {
  let date = req.body.date;
  let Note = req.getModel('note');
  Note.deleteOne({date: date}).then(() => {
    console.log('笔记已经删除');
    Note.find({}, (err, notes) => {
      res.json(notes);
    });
  })
})

module.exports = router;

