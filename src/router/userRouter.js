const userRoute = require('../core/routerConfig');
const userController = require('../controller/userController');
const { authenticate } = require('../core/userAuth');
const { USER_TYPE } = require('../utils/constants');

userRoute.route('/users')
    .post(userController.signup)
    .get(authenticate, userController.getUserProfile)
    .put(authenticate, userController.updateUserDetails);

userRoute.route('/users/all')
    .get(authenticate, userController.getAllUser);

userRoute.route('/users/login')
    .post(userController.login);

    
module.exports = userRoute;
