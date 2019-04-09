// module.exports = (app) => {
//     const controller = require('../controller');
//     //app.route('/v1/login')
//         //.post(controller.login);
//     app.route('/user')
//         .get(controller.listAllUser)
//         .post(controller.addUser);
//     app.route('/user/:userID')
//         .get(controller.getUser)
//         .put(controller.updateUser)
//         .delete(controller.deleteUser);
// }

const userRoutes = require('./users');
const customerRoutes = require('./customers');

/**Deprecated */