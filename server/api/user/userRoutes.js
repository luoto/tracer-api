var router = require('express').Router();
var controller = require('./userController.js');

router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/signup', controller.signup);

module.exports = router;
