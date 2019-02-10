const bcrypt = require('bcrypt');

const saltRounds = 10;

const User = require('../models/user.model');

/**
 * @swagger
 * /users/signup:
 *    post:
 *      tags:
 *      - "user"
 *      summary: "Add a new user"
 *      operationId: "addUser"
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User object that needs to be added"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/User"
 *      responses:
 *        200:
 *          description: "Successful sign up"
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *        400:
 *          description: "User content can not be empty"
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *        500:
 *          description: "Some error occurred while creating the User."
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *      security:
 *      - petstore_auth:
 *        - "write:users"
 *        - "read:users"
 */
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
    .then(() => {
      res.status(200).send({
        message: 'Successful sign up',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};
