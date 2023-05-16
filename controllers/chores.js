const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//This will get a list of all chores
const getChores = async (req, res) => {
  const result = await mongodb.getDb().db().collection('chores').find(); //no arguments given, so it will return all
  result.toArray().then((choreList) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(choreList);
  });
};

//This will get a specific chore
const getSingleChore = async (req, res) => {
  const choreId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('chores').find({ _id: choreId });
  result.toArray().then((choreList) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(choreList[0]); //This will display the first record returned that matched the argument in the find function
  });
};

//This will add a document to the chores database
const addChore = async (req, res) => {
  const newChore = {
    choreName: req.body.choreName,
    estimatedTime: req.body.estimatedTime,
    indoor: req.body.indoor,
    outdoor: req.body.outdoor,
    spring: req.body.spring,
    summer: req.body.summer,
    fall: req.body.fall,
    winter: req.body.winter
  };
  const response = await mongodb.getDb().db().collection('chores').insertOne(newChore);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Sorry, an error occurred while creating the new chore.');
  }
};

//This will edit a chore
const editChore = async (req, res) => {
  const choreId = new ObjectId(req.params.id);
  const updateChore = {
    choreName: req.body.choreName,
    estimatedTime: req.body.estimatedTime,
    indoor: req.body.indoor,
    outdoor: req.body.outdoor,
    spring: req.body.spring,
    summer: req.body.summer,
    fall: req.body.fall,
    winter: req.body.winter
  };
  const response = await mongodb.getDb().db().collection('chores').replaceOne({ _id: choreId }, updateChore);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Sorry, an error occurred while updating the chore.');
  }
};

//This will delete a chore
const deleteChore = async (req, res) => {
  const choreId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('chores').deleteOne({ _id: choreId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Sorry, an error occurred while deleting the chore.');
  }
};

module.exports = {
  getChores,
  getSingleChore,
  addChore,
  editChore,
  deleteChore
};