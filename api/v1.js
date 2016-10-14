'use strict';
const prefix = '/api/v1/';
const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');

module.exports = function(options){

  //This is your express app object
  let app = options.app;
  //This is the map of all of your sequelize models
  let models = options.models;

  /* User logging in, this gives their store in the response */
  app.get(prefix+'login', function(req, res){
    var resultJson = {
      errors: []
    };
    var auth = atob(req.get('Authorization').split(' ')[1]).split(':');
    models.User.findOne({
      where: {
        email: auth[0]
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
      bcrypt.compare(auth[1], plainUser.password, function(err, res){
        if (res){
          //correct, give them the store and jwt
          resultJson.store = plainUser.store;
          resultJson.jwt = jwt.sign({email: auth[0]}, process.env.JWT_SECRET);
          res.json(resultJson);
        }
        else{
          //incorrect, give error json
          resultJson.errors.push('Incorrect password');
          res.json(resultJson);
        }
        res.end();
      });
    });
  });

  /* User registering, gives no store in response */
  app.get(prefix+'register', function(req, res){
    var resultJson = {
      errors: []
    };
    var email = req.body.email;
    var password = req.body.password;
    bcrypt.hash(password, 10, function(err, hash){
      models.User.findOrCreate({
        where: {email: email},
        defaults: {
          password: hash
        }
      })
      .spread(function(user, created) {
        if (!created){
          resultJson.errors.push('User with that email already exists');
          res.json(resultJson);
          res.end();
          return;
        }
        //give jwt
        resultJson.jwt = jwt.sign({email: email}, process.env.JWT_SECRET);
        res.json(resultJson);
        res.end();
      });
    });
  });

  /* When user is updating their store */
  app.post(prefix+'store', function(req, res){
    var user = req.user;//jwt data
  });

};
