var mongoose = require('mongoose')

    , Schema = mongoose.Schema

var PostSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  author: String,
  description: String,
  comment:[{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Post', PostSchema);