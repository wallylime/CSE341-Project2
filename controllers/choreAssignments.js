const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//This will get a list of all the chore assignments
const getChoreAssignments = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('choreAssignments').find(); //no arguments given, so it will return all
    result.toArray().then((assignmentList) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(assignmentList);
    },
      (err) => { res.status(400).json({ message: err }) });
  } catch (err) {
    res.status(500).json(err);
  }
};

//This will get a chore assignment for a specific child
const getOneChildAssignment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
    }
    const personId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('choreAssignments').find({ _id: personId });
    result.toArray().then((assignmentList) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(assignmentList[0]);
    },
      (err) => { res.status(400).json({ message: err }) });
  } catch (err) {
    res.status(500).json(err);
  }
};

//This will add a new chore assignment document
const addChoreAssignment = async (req, res) => {
  try {
    const newAssignment = {
      name: req.body.name,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday
    };
    const response = await mongodb.getDb().db().collection('choreAssignments').insertOne(newAssignment);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Sorry, an error occurred while creating the new chore assignment.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//This will edit a chore assignment
const editChoreAssignment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
    }
    const personId = new ObjectId(req.params.id);
    const updateAssignment = {
      name: req.body.name,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday,
      friday: req.body.friday
    };
    const response = await mongodb.getDb().db().collection('choreAssignments').replaceOne({ _id: personId }, updateAssignment);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Sorry, an error occurred while updating the chore assignment.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//This will delete a person's chore assignment
const deleteChoreAssignment = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
    }
    const personId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('choreAssignments').deleteOne({ _id: personId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Sorry, an error occurred while deleting the chore assignment.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getChoreAssignments,
  getOneChildAssignment,
  addChoreAssignment,
  editChoreAssignment,
  deleteChoreAssignment
};