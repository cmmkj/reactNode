// 新评论
exports.createComment = function (req, res, next) {
  let {body: {content, commentid, noteid, fromUserid, toUserid}, getModel} = req
  let Comment = getModel('comment')
  if (commentid) {
    Comment.findById(commentid).then(doc => {
      let reply = {
        fromUserid,
        toUserid,
        content
      }
      doc.reply.push(reply)
      doc.save().then(() => {
        let Note = req.getModel('note')
        return Note.incCommentCnt(noteid).then(() => {
          Comment.find({noteid})
            .populate('fromUserid', 'name')
            .populate('reply.fromUserid reply.toUserid', 'name')
            .exec()
            .then(comments => {  
              res.json({
                comments
              });
            })
        })
      })
    })
  } else {
    Comment.create({commentid, noteid, fromUserid, toUserid, content}).then(doc => {
      let Note = req.getModel('note')
      return Note.incCommentCnt(noteid).then(() => {
        Comment.find({noteid})
          .populate('fromUserid', 'name')
          .populate('reply.fromUserid reply.toUserid', 'name')
          .exec()
          .then(comments => {  
            res.json({
              comments
            });
          })
      })
    }) 
  }
}

exports.findNoteComments = function (req, res, next) {
  let {params: {noteid}} = req
  let Comment = req.getModel('comment')
  return Comment.find({noteid})
    .populate('fromUserid', 'name')
    .populate('reply.fromUserid reply.toUserid', 'name')
    .exec()
    .then(comments => {  
      res.json({
        comments
      });
    })
}
