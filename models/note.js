const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let noteSchema = new Schema({
  title: {type: String, required: true},
  content: {type:String, required: true},
  date: {type: String, required: true},
  pv: {type: Number},
  authorid: Schema.Types.ObjectId
});

let Note = mongoose.model('note', noteSchema);

module.exports = Note;

