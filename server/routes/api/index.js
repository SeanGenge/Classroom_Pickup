const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const registrationRoutes = require('./registrationRoutes');
const studentCarRoutes = require('./studentCarRoutes');

router.use('/student', studentRoutes);
router.use('/registration', registrationRoutes);
router.use('/studentcar', studentCarRoutes);

module.exports = router;
