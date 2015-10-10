var router = require('express').Router();

// mount user router
router.use('/user', require('./user/userRoutes'));
router.use('/logs', require('./log/logRoutes'));

module.exports = router;
