const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqq')
  let Note = req.getModel('note');
  Note.find({}).exec().then(notes => {
    console.log('111111111111111111111')
    console.log(notes)
    res.json(notes);
  })
});

module.exports = router;
