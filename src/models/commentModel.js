const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new Schema(
    {
        author: {
            type: String,
            index: true,
            required: true,
        },
        text: String,
        date: {
            type: Number,
            default: Date.now
          }, 
            
    },
    {
        strictQuery: 'throw'
    }
);

commentSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const CommentSchema = model('Comment', commentSchema);
module.exports = CommentSchema;


