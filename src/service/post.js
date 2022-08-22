const PostSchema = require('../models/postModel');
const {throwError} = require("../utils/handleErrors");
const {validateParameters} = require('../utils/util');

class Post {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    async create() {
        const { isValid, messages } = validateParameters(
            ["name", "description", "image", "time"],
            this.data
          );
          if (!isValid) { 
            throwError(messages);
          }
          const post = new PostSchema(this.data);
          const newPost = await post.save();
        return newPost;
    }
    // get all user posts
    async getAllPosts() {
        const posts = await PostSchema.find({
            author: this.data.author
        });
        return posts;
    }
    // get a post by id
    async getPostById() {
        const post = await PostSchema.findOne({
            _id: this.data.id,
            author: this.data.author
        });
        return post;
    }
    // update a post by id
    async updatePostById() {
        const { id, author, name, description, image, time } = this.data;
        const post = await PostSchema.findOneAndUpdate(
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
        return post;
    }
    // delete a post by id
    async deletePostById() {
        const { id, author } = this.data;
        const post = await PostSchema.findOneAndDelete({
            _id: id,
            author
        });
        return post;
    }
};

module.exports = Post;
