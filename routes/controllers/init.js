const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  let Note = req.getModel('note');
  Note.find({}).exec().then(notes => {
    res.json(notes);
  })
});

module.exports = router;
