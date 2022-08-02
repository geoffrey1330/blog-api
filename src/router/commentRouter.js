const commentRoute = require('../core/routerConfig');
const commentController = require('../controller/commentController');
const { authenticate } = require('../core/userAuth');

commentRoute.route('/comments')
    .post(authenticate, commentController.create)
    .get(authenticate, commentController.getAllComments);

commentRoute.route('/comment/:id')
    .get(authenticate, commentController.getCommentById)
    .put(authenticate, commentController.updateCommentById)
    .delete(authenticate, commentController.deleteCommentById);

module.exports = commentRoute;
