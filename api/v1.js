'use strict';
const prefix = '/api/v1/';
const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode-npm');
const sendRegistrationEmail = require('../managers/emailManager').sendRegistrationEmail;

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

function createQRCodeImgTag(url){
  var size = 4;
  while(true && size <= 40){
    try{
      var qr = qrcode.qrcode(size, 'L');
      qr.addData(url);
      qr.make();
      return qr.createImgTag();
    }
    catch(err){
      size++;
    }
  }
  throw new Error('QR Code unable to be created');
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
    var totp = req.body.totp;
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
          //correct, check for existence of totpSecret
          if (plainUser.totpSecret){
            resultJson.needsTotp = true;
            if (totp){
              //check totp for correctness
              var verified = speakeasy.totp.verify({
                secret: plainUser.totpSecret,
                encoding: 'base32',
                token: totp,
                window: 5
              });
              if (verified){
                //verified totp
                resultJson.store = plainUser.store;
                resultJson.jwt = createLoginJWT(auth[0]);
              }
              else{
                //incorrect totp
                resultJson.errors.push('Incorrect totp code');
              }
            }
          }
          else{
            //no totpSecret
            resultJson.store = plainUser.store;
            resultJson.jwt = createLoginJWT(auth[0]);
            resultJson.needsTotp = false;
          }
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

  /* User changing password */
  app.post(prefix+'changePassword', ejwt({secret: process.env.JWT_SECRET}), function(req, res){
    var resultJson = {
      errors: []
    };
    var password = req.body.password;
    var email = req.user.email;
    bcrypt.hash(password, 10, function(err, hash){
      models.User.findOne({
        where: {
          email: email
        }
      })
      .then(function(user) {
        if (!user){
          resultJson.errors.push('No user by that email');
          return;
        }
        user.password = hash;
        return user.save();
      })
      .then(function(){
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

  /* Create totp code for user if it doesn't exist, and return dataUrl code */
  app.get(prefix+'totp', ejwt({secret: process.env.JWT_SECRET}), function(req, res){
    var user = req.user;//jwt data
    models.User.findOne({
      where: {
        email: user.email
      }
    })
    .then(function(user){
      if (!user){
        res.end();
        return;
      }
      var resultJson = {
        errors: []
      };
      let totpSecret = user.totpSecret;
      if (!user.totpSecret){
        //generate and save
        totpSecret = speakeasy.generateSecret({length: 20}).base32;
        user.totpSecret = totpSecret;
        user.save();
      }
      let url = speakeasy.otpauthURL({
        secret: totpSecret,
        label: "Frost ("+user.email+")",
        encoding: 'base32'
      });
      try{
        var imgTag = createQRCodeImgTag(url);
        resultJson.imgTag = imgTag;
      }
      catch(err){
        resultJson.imgTag = '';
        resultJson.errors.push(err.message);
      }
      res.json(resultJson);
      res.end();
    });
  });

  /* Delete current totp secret for user on record */
  app.delete(prefix+'totp', ejwt({secret: process.env.JWT_SECRET}), function(req, res){
    var user = req.user;//jwt data
    models.User.findOne({
      where: {
        email: user.email
      }
    })
    .then(function(user){
      if (!user){
        res.end();
        return;
      }
      var resultJson = {
        errors: []
      };
      user.totpSecret = null;
      user.save();
      res.json(resultJson);
      res.end();
    });
  });

};
