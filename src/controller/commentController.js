const { error, success } = require("../utils/baseController");
const { logger } = require("../utils/logger");
const Comment = require("../service/comment");
const Post = require("../service/post");

exports.create = async (req, res) => {
    try {
        const {postid} = req.params;
        const {text} = req.body;
        const author = req.user._id;
        const comment = await new Comment({
            text,
            postid,
            author
        }).create();
        
        return success(res, { comment });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// get all user Comment
exports.getAllComments = async (req, res) => {
    try {
        const author = req.user._id;
        const comments = await new Comment({ author }).getAllComments();
        return success(res, { comments });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// get a comment by id
exports.getCommentById = async (req, res) => {
    try {
        const { postid, id } = req.params;
        const author = req.user._id;
        const comment = await new Comment({ id, author }).getCommentById();
        return success(res, { comment });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// update a Comment by id
exports.updateCommentById = async (req, res) => {
    try {
        const { text } = req.body;
        const { postid, id } = req.params;
        const author = req.user._id;
        const comment = await new Comment({ id, author, text }).updateCommentById();
        return success(res, { comment });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}

// delete a Comment by id
exports.deleteCommentById = async (req, res) => {
    try {
        const { postid, id } = req.params;
        const author = req.user._id;
        const comment = await new Comment({ id, postid, author }).deleteCommentById();
        
        return success(res, { comment });
    }catch(err) {
        logger.error("Error occurred at signup", err);
        return error(res, { code: err.code, message: err })
    }
}