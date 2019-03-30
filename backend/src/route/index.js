module.exports = (app) => {
    const controller = require('../controller');
    app.route('/user')
        .get(controller.listAllUser);
}