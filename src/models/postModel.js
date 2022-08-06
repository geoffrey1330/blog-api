const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = new Schema(
    {
        author: {
            type: String,
            index: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        
        time: {
            type: Date,
            required: true,
        },
        comments: [{
            comment: {
              type: String,
              minlength: 8,
              maxlength: 128
            },
            },
        ],
    },
    {
        strictQuery: 'throw'
    }
);

postSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const PostSchema = model('Post', postSchema);
module.exports = PostSchema;
