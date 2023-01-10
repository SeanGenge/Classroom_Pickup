const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const registrationRoutes = require('./registrationRoutes');
const studentRegoRoutes = require('./studentRegoRoutes');

router.use('/student', studentRoutes);

module.exports = router;
