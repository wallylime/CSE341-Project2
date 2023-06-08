const express = require('express');
const router = express.Router();

const choreAssignmentsController = require('../controllers/choreAssignments');
const validator = require('../middleware/validate');
const checkAuth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in.");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
}

router.get('/', choreAssignmentsController.getChoreAssignments);
router.get('/:id', choreAssignmentsController.getOneChildAssignment);
router.post('/add', checkAuth, validator.saveAssignment, choreAssignmentsController.addChoreAssignment);
router.put('/edit/:id', checkAuth, validator.saveAssignment, choreAssignmentsController.editChoreAssignment);
router.delete('/delete/:id', checkAuth, choreAssignmentsController.deleteChoreAssignment);

module.exports = router;