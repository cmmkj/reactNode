const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let noteSchema = new Schema({
  title: {type: String, required: true},
  content: {type:String, required: true},
  date: {type: String, required: true},
  pv: {type: Number},
  authorid: Schema.Types.ObjectId,
  author:{type: String},
  commentCnt: {type: Number}      // 留言条数
});

let Note = mongoose.model('Note', noteSchema);

Note.incPv = function (noteid) {
  return Note.updateOne({_id: noteid}, {$inc: {pv: 1}})
}

Note.incCommentCnt = function (noteid) {
  return Note.updateOne({_id: noteid}, {$inc: {commentCnt: 1}})
}
module.exports = Note;

