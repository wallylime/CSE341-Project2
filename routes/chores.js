const express = require('express');
const router = express.Router();

const choresController = require('../controllers/chores');

router.get('/', choresController.getChores);
router.get('/:id', choresController.getSingleChore);
router.post('/add', choresController.addChore);
router.put('/edit/:id', choresController.editChore);
router.delete('/delete/:id', choresController.deleteChore);

module.exports = router;
