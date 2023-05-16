const express = require('express');
const router = express.Router();

router.use('/chores', require('./chores'));
router.use('/', require('./swagger'));

module.exports = router;
