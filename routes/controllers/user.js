const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const SALT = 10;

function createToken (user) {
  return jwt.sign(_.omit(user, 'pwsswd'), config.jwt.secret, {expiresIn: config.jwt.expired});
}

function hashPwd(passwd) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT, (err, salt) => {
      if(err) return reject(err);
      bcrypt.hash(passwd, salt, (err, hash) => {
        if(err) return reject(err);
        return resolve(hash);
      });
    })
  });
}

router.post('/createUser', (req, res, next) => {
  let newUser = req.body;
  newUser = _.pick(newUser, ['name','phonenum', 'picture', 'passwd', 'created']);
  let User = req.getModel('user');

  return hashPwd(newUser.passwd).then( hash => {
    newUser.passwd = hash;
    return User.create(newUser).then(doc => {
      console.log('成功创建新用户！');
      console.log(doc);
      res.json('注册成功')
    })
  });
});

router.post('/loginUser', (req, res, next) => {
  let {body: {name, passwd}, getModel} = req; 
  let User = getModel('user');
  return User.findOne({name}).then(doc => {
    if(!doc) throw new Error('用户名不存在');
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwd, doc.passwd, (err, match) => {
        if(err) return reject(err);
        if(!match) return reject('密码错误');
        res.json({
          token: createToken(doc)
        })
      });
    });
  })
})


module.exports = router;
