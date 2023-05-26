const express = require('express');
const router = express.Router();

const choresController = require('../controllers/chores');
const validator = require('../middleware/validate');

router.get('/', choresController.getChores);
router.get('/:id', choresController.getSingleChore);
router.post('/add', validator.saveChore, choresController.addChore);
router.put('/edit/:id', validator.saveChore, choresController.editChore);
router.delete('/delete/:id', choresController.deleteChore);

module.exports = router;