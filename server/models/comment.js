const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

let commentSchema = new Schema({
  noteid: {type: ObjectId, ref: 'Note'},
  formUserid: {type: ObjectId, ref: 'User'},
  reply: [{
    fromUserid: {type: ObjectId, ref: 'User'},
    toUserid: {type: ObjectId, ref: 'User'},
    content: String
  }],
  content: String,
  meta: {
    created: {
      type: Date,
      default: Date.now()
    },
    updated: {
      type: Date,
      default: Date.now()
    }
  }
})

commentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.created = this.meta.updated = Date.now()
  } else {
    this.meta.updated = Date.now()
  }
  next()
})

commentSchema.statics = {
  fetch: function (cb) {
    return this
      .tind({})
      .sort('meta.updated')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
