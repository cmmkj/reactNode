// 新评论
exports.createComment = function (req, res, next) {
  let {body: {commentid, noteid, fromUserid, toUserid}, getModel} = req
  let Comment = getModel('comment')
  if (commentid) {
    Comment.findById(commentid).then(doc => {
      let reply = {
        fromUserid,
        toUserid,
        content
      }
      doc.reply.push(reply)
      doc.save()
      res.json(doc)
    })
  } else {
    Comment.create({commentid, noteid, fromUserid, toUserid}).then(doc => {
      res.json()
    }) 
  }
}

