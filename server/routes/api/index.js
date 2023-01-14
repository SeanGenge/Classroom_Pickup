const router = require('express').Router();
const studentRoutes = require('./studentRoutes');
const carRoutes = require('./carRoutes');
const studentCarRoutes = require('./studentCarRoutes');

router.use('/student', studentRoutes);
router.use('/car', carRoutes);
router.use('/studentcar', studentCarRoutes);

module.exports = router;
