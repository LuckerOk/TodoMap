const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models/user.model');

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'User content can not be empty',
    });
  }

  const user = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, saltRounds),
    firstName: req.body.firstName,
  });

  return user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};
