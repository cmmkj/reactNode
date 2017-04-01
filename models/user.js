const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let userSchema = new Schema({
  name: {type: String, required: true},
  passwd: {type: String, required: true},
  phonenum: {type:String},
  created: {type: String, required: true},
  picture: {type: String}
});

let User = mongoose.model('user', userSchema);

module.exports = User;

