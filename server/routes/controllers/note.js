exports.addNote = function (req, res, next){
  let newNote = req.body;
  let Note = req.getModel('note');
  newNote.date = newNote.date || new Date();
  Note.create(newNote).then(doc => {
    res.json();
  })
}

exports.deleteNote = (req, res, next) => {
  let noteid = req.body.noteid;
  let Note = req.getModel('note');
  let userid = req.body.userid
  Note.deleteOne({_id: noteid}).then(() => {
    console.log('已经删除');
    Note.find({authorid: userid}, (err, notes) => {
      res.json(notes);
    });
  })
}

exports.getNote = (req, res, next) => {
  let noteid = req.params.noteid;
  let Note = req.getModel('note');
  return Note.findById(noteid).then(doc => {
    console.log('使用id查找成功');
    return Note.incPv(noteid).then(() => {
      let Comment = req.getModel('comment')
      return Comment.find({noteid})
        .populate('from', 'name')
        .populate('reply.from reply.to', 'name')
        .exec()
        .then(comments => {
          res.json({
            note:doc,
            comments
          });
        })
    })
  });
}

exports.userNotes = (req, res, next) => {
  let userid = req.query.userid;
  let Note = req.getModel('note');
  console.log('用户主页显示')
  Note.find({authorid: userid}).then(notes => {
    res.json(notes)
  })
}
