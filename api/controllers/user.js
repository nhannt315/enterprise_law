const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');

const userModel = require('../models/user');;

Router.post('/signUp', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  userModel.findUserByEmail(email)
    .then(users => {
      if (users.length >= 1) {
        return res.status(HttpStatus.CONFLICT).json({
          message: 'Email exists'
        })
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
          })
        } else {
          userModel.createNewUser(email, hash)
            .then(user => {
              const token = jwt.sign({
                emaiL: user.email,
                userId: user._id
              }, process.env.JWT_KEY, {
                expiresIn: '1h'
              });
              res.status(HttpStatus.CREATED).json({
                message: 'Signup successfully',
                _id: user._id,
                email: user.email,
                token: token,
                expiresIn: 3600
              })
            })
            .catch(err => {
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: err
              })
            });
        }
      })
    })
    .catch(err => {
      console.log(err);
    });
});

Router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  userModel.findUserByEmail(email)
    .then(users => {
      if (users.length < 1) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(password, users[0].password, (err, result) => {
        if (!result) {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          const token = jwt.sign({
            emaiL: users[0].email,
            userId: users[0]._id
          }, process.env.JWT_KEY, {
            expiresIn: '1h'
          });
          return res.status(HttpStatus.OK).json({
            message: 'Auth successful',
            email: users[0].email,
            _id: users[0]._id,
            token: token,
            expiresIn: 3600
          })
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: err
      });
    });
});

module.exports = Router;