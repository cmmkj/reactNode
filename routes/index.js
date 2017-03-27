const express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
  //res.send("11111111111111111111111111111");
  res.render('index.html');
});

module.exports = router;
