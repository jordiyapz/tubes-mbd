const express = require('express');
const router = express.Router();

const controller = require('../controller');

router.get('/', controller.listAllUser);
router.post('/', controller.addUser);
router.get('/:userId', controller.getUser);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);
router.post('/signup', controller.signupUser);

module.exports = router;