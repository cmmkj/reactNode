
exports.notesList = function (req, res, next) {
  let Note = req.getModel('note');
  Note.find({}).exec().then(notes => {
    res.json(notes);
  })  
}
