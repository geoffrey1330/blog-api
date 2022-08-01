const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");
const Post = require("../service/post");


exports.create = async (req, res) => {
    try {
        const { name, description, image, time } = req.body;
        const author = req.user._id;
        const post = await new Post({
            name,
            description,
            image,
            time,
            author
        }).create();
        return success(res, { post });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// get all user post
exports.getAllPosts = async (req, res) => {
    try {
        const author = req.user._id;
        const posts = await new Post({ author }).getAllPosts();
        return success(res, { posts });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// get a todo by id
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = req.user._id;
        const post = await new Post({ id, author }).getPostById();
        return success(res, { post });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// update a post by id
exports.updatePostById = async (req, res) => {
    try {
        const { name, description, image, time } = req.body;
        const { id } = req.params;
        const author = req.user._id;
        const post = await new Post({ id, author, name, description, image, time }).updatePostById();
        return success(res, { post });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// delete a post by id
exports.deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = req.user._id;
        const post = await new Post({ id, author }).deletePostById();
        return success(res, { post });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}