const commentRoute = require('../core/routerConfig');
const commentController = require('../controller/commentController');
const { authenticate } = require('../core/userAuth');

commentRoute.route('/post/:postid/comments')
    .post(authenticate, commentController.create)
    .get(authenticate, commentController.getAllComments);

commentRoute.route('/post/:postid/comment/:id')
    .get(authenticate, commentController.getCommentById)
    .put(authenticate, commentController.updateCommentById)
    .delete(authenticate, commentController.deleteCommentById);

module.exports = commentRoute;
