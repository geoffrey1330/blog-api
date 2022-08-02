const CommentSchema = require('../models/commentModel');
const {throwError} = require("../utils/handleErrors");
const {validateParameters} = require('../utils/util');

class Comment {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    async create() {
        const { isValid, messages } = validateParameters(
            ["text"],
            this.data
          );
          if (!isValid) { 
            throwError(messages);
          }
          const Comment = new CommentSchema(this.data);
          const newComment = await Comment.save();
        return newComment;
    }
    // get all user Comments
    async getAllComments() {
        const Comments = await CommentSchema.find({
            author: this.data.author
        });
        return Comments;
    }
    // get a Comment by id
    async getCommentById() {
        const Comment = await CommentSchema.findOne({
            _id: this.data.id,
            author: this.data.author
        });
        return Comment;
    }
    // update a Comment by id
    async updateCommentById() {
        const { id, author, name, description, image, time } = this.data;
        const Comment = await CommentSchema.findOneAndUpdate(
            {
                _id: id,
                author
            },
            {
                $set: {
                    name,
                    description,
                    image,
                    time
                }
            },
            {
                new: true
            }
        );
        return Comment;
    }
    // delete a Comment by id
    async deleteCommentById() {
        const { id, author } = this.data;
        const Comment = await CommentSchema.findOneAndDelete({
            _id: id,
            author
        });
        return Comment;
    }
};

module.exports = Comment;