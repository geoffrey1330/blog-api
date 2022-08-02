const postRoute = require('../core/routerConfig');
const postController = require('../controller/postController');
const { authenticate } = require('../core/userAuth');

postRoute.route('/posts')
    .post(authenticate, postController.create)
    .get(authenticate, postController.getAllPosts);

postRoute.route('/post/:id')
    .get(authenticate, postController.getPostById)
    .put(authenticate, postController.updatePostById)
    .delete(authenticate, postController.deletePostById);

module.exports = postRoute;
