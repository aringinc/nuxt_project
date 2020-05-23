const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comments',
    },
  ],
});

module.exports = model('posts', userSchema);
