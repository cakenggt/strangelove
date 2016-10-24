'use strict';
const prefix = '/api/v1/';
const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');
const sendRegistrationEmail = require('./managers/emailManager').sendRegistrationEmail;

function createLoginJWT(email){
  return jwt.sign(
    {email: email},
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function createRegistrationJWT(email){
  return jwt.sign(
    {email: email},
    process.env.JWT_SECRET,
    { expiresIn: '3h' }
  );
}

module.exports = function(options){

  //This is your express app object
  let app = options.app;
  //This is the map of all of your sequelize models
  let models = options.models;

  /* User logging in, this gives their store in the response */
  app.post(prefix+'login', function(req, res){
    var resultJson = {
      errors: []
    };
    var auth = atob(req.get('Authorization').split(' ')[1]).split(':');
    models.User.findOne({
      where: {
        email: auth[0],
        status: 'ACTIVE'
      }
    })
    .then(function(user){
      if (!user){
        //no user, return error json
        resultJson.errors.push('No user exists by that email');
        res.json(resultJson);
        res.end();
        return;
      }
      var plainUser = user.get({plain: true});
      var now = new Date();
      //Rate limit login attempts
      if (plainUser.lastLoginFail && now-plainUser.lastLoginFail < 3000){
        resultJson.errors.push('Too rapid login');
        res.json(resultJson);
        return;
      }
      bcrypt.compare(auth[1], plainUser.password, function(err, result){
        if (result){
          //correct, give them the store and jwt
          resultJson.store = plainUser.store;
          resultJson.jwt = createLoginJWT(auth[0]);
          res.json(resultJson);
        }
        else{
          //incorrect, give error json
          resultJson.errors.push('Incorrect password');
          res.json(resultJson);
          user.lastLoginFail = new Date();
          user.save();
        }
        res.end();
      });
    });
  });

  /* User registering, send email and create account */
  app.post(prefix+'register', function(req, res){
    var resultJson = {
      errors: []
    };
    var email = req.body.email;
    var password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
      models.User.findOrCreate({
        where: {email: email},
        defaults: {
          password: hash,
          status: 'PENDING'
        }
      })
      .spread(function(user, created) {
        if (!created){
          resultJson.errors.push('User with that email already exists');
          res.json(resultJson);
          res.end();
          return;
        }
        let registrationJWT = createRegistrationJWT(email);
        let link = process.env.URL + 'api/v1/confirm/'+registrationJWT;
        sendRegistrationEmail(email, {
          link: link
        })
        .catch(function(err){
          console.log(err.response.body);
        });
        res.json(resultJson);
        res.end();
      })
      .catch(function(err){
        resultJson.errors.push(err);
        res.json(resultJson);
        res.end();
      });
    });
  });

  /* Gets a confirmation code  */
  app.get(prefix+'confirm/:code', function(req, res){
    let code = req.params.code;
    jwt.verify(code, process.env.JWT_SECRET, function(err, decoded){
      if (err){
        //TODO show error page
        res.end();
        return;
      }
      let email = decoded.email;
      models.User.findOne({
        where: {
          email: email
        }
      })
      .then(function(user){
        user.status = 'ACTIVE';
        return user.save();
      })
      .then(function(){
        res.redirect('/');
        res.end();
      });
    });
  });

  /* When user is updating their store */
  app.post(prefix+'store', ejwt({secret: process.env.JWT_SECRET}), function(req, res){
    var user = req.user;//jwt data
    var store = req.body.store;
    var resultJson = {
      errors: []
    };
    models.User.findOne({
      where: {
        email: user.email
      }
    })
    .then(function(user){
      user.store = store;
      return user.save();
    })
    .then(function(){
      res.json(resultJson);
      res.end();
    });
  });

};
