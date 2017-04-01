const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let noteSchema = new Schema({
  title: {type: String, required: true},
  description: {type:String, required: true},
  date: {type: String, required: true}
});

let Note = mongoose.model('note', noteSchema);

module.exports = Note;

