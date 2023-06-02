const express = require('express');
const router = express.Router();

const choreAssignmentsController = require('../controllers/choreAssignments');
const validator = require('../middleware/validate');

router.get('/', choreAssignmentsController.getChoreAssignments);
router.get('/:id', choreAssignmentsController.getOneChildAssignment);
router.put('/edit/:id', validator.editAssignment, choreAssignmentsController.editChoreAssignment);
router.delete('/delete/:id', choreAssignmentsController.deleteChoreAssignment);

module.exports = router;