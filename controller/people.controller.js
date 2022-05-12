const people = require("../models/people.model");

exports.findAll = (req, res) => {
  people.getAll((err, data) => {
    if (err) {
      res.status(500).send({ msg: err });
    } else {
        res.status(200).send(data)
    }
  });
};

exports.insertOne = (req, res) => {
  
}