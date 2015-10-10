var router = require('express').Router();
var controller = require('./logController');
var isAuthenticated = require('../../middleware/ensureAuthentication');

router.get('/', isAuthenticated, controller.get);
router.post('/', isAuthenticated, controller.post);

module.exports = router;
