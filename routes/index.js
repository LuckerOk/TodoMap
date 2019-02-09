const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', (req, res) => {
  res.send('respond with a resource.');
});

//user
router.post('/users/signup', userController.create);

module.exports = router;
