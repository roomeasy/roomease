// Setting up passport.
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/userModel.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;

//if in heroku environment, user their variables, if not, use our own from auth.js file.
var auth = process.env.DATABASE_URL ? null : require('./auth.js');
//var callbackURL = process.env.DATABASE_URL ? "http://roomeasy-staging.herokuapp.com/auth/facebook/callback" : "http://localhost:3000/auth/facebook/callback";

module.exports = function(passport) {

  // used to serialize the user for the session
  // this happens when a user first visits the site and logs in via facebook
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  // this happens on every request so we know which user is logged in.
  passport.deserializeUser(function(id, done) {
    console.log("in here", id)
    User.findUserById(id, function(err, user) {
       console.log(err);
      // if user is found within sessions, they can proceed with request
      // if not, returns error
      user ? done(null, user) : done(err, null);
    });
  });

  // =========================================================================
  // GITHUB ================================================================
  // =========================================================================

  passport.use(new GithubStrategy({
        clientID: '6dba5a7648894c6d3b20',
        clientSecret: '453d1fa52b473387fbccfb64972c4b25314b0ef6',
        callbackURL: 'http://localhost:3000/auth/github/callback',
        passReqToCallback: true
      },

      function(req, accessToken, refreshToken, profile, done){
        console.log(profile);
        // asynchronous
        process.nextTick(function() {
          var github_id = profile.id;

          // find the user in the database based on their github_id
          User.findUserByGithubId(github_id, function(err, user) {

            // if there is an error, stop everything and return that
            // i.e. an error connecting to the database
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
              return done(null, user);
            } else {

              // if there is no user found with that roomease_id, create them
              var newUser = {};

              // take information returned from facebook and using that data,
              // parse through it and make a newUser object.
              newUser.gender         = null;
              newUser.github_id      = profile.id;
              newUser.twitter_id     = 0;
              newUser.google_id      = 0;
              newUser.facebook_id    = 0;
              newUser.picture        = profile._json.avatar_url;
              newUser.username       = profile.displayName;

              // save our user to the database
              User.addUser(newUser, function(err, results) {
                if (err) throw err;

                // if successful, return the new user
                return done(null, results);
              });
            }
          });
        });
      }));

  // =========================================================================
  // TWITTER ================================================================
  // =========================================================================

  passport.use(new TwitterStrategy({
        consumerKey: '6GqsR4EcbvOdfisAgBqnIgsWB',
        consumerSecret: 'e0jryipl7M4z9R9kSpetemgOvp8ijqd4EwVfConNddi6B0KE5a',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
      },

      function(req, token, tokenSecret, profile, done){
        console.log(profile);
        // asynchronous
        process.nextTick(function() {
          var twitter_id = profile.id;

          // find the user in the database based on their roomease_id
          User.findUserByTwitterId(twitter_id, function(err, user) {

            // if there is an error, stop everything and return that
            // i.e. an error connecting to the database
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
              return done(null, user);
            } else {

              // if there is no user found with that roomease_id, create them
              var newUser = {};

              // take information returned from facebook and using that data,
              // parse through it and make a newUser object.
              newUser.gender         = null;
              newUser.github_id      = 0
              newUser.twitter_id     = profile.id;
              newUser.google_id      = 0;
              newUser.facebook_id    = 0;
              newUser.picture        = profile.photos[0].value;
              newUser.username       = profile.displayName;

              // save our user to the database
              User.addUser(newUser, function(err, results) {
                if (err) throw err;

                // if successful, return the new user
                return done(null, results);
              });
            }
          });
        });
      }));

  // =========================================================================
  // GOOGLE ================================================================
  // =========================================================================

  passport.use(new GoogleStrategy({
    clientID: '121082359533-1ct66h358dulf051k2l7qntunp96vicm.apps.googleusercontent.com',
    clientSecret: 'OKi0-BREnEq3kMo6yiUVMBjY',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
      },

      function(req, accessToken, refreshToken, profile, done){
        console.log(profile);
        // asynchronous
        process.nextTick(function() {
          var google_id = profile.id;

          // find the user in the database based on their facebook id
          User.findUserByGoogleId(google_id, function(err, user) {

            // if there is an error, stop everything and return that
            // i.e. an error connecting to the database
            if (err) return done(err);

            // if the user is found, then log them in
            if (user) {
              return done(null, user);
            } else {

              // if there is no user found with that facebook id, create them
              var newUser = {};

              // take information returned from facebook and using that data,
              // parse through it and make a newUser object.
              newUser.gender         = profile.gender;
              newUser.github_id      = 0;
              newUser.twitter_id     = 0;
              newUser.google_id      = profile.id;
              newUser.facebook_id    = 0;
              newUser.picture        = profile._json.image.url;
              newUser.username       = profile.displayName;

              // save our user to the database
              User.addUser(newUser, function(err, results) {
                if (err) console.log(err);

                // if successful, return the new user
                return done(null, results);
              });
            }
          });
        });
      }));


  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({

    // pull in our app id and secret from either heroku or our auth.js file.
    clientID        : process.env.FACEBOOK_CLIENT_ID || auth.facebookAuth.clientID,
    clientSecret    : process.env.FACEBOOK_CLIENT_SECRET || auth.facebookAuth.clientSecret,
    callbackURL     : auth.facebookAuth.callbackURL,
    profileFields   : ['id', 'displayName', 'gender', 'profileUrl', 'picture.type(large)', 'friends']
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {
      var facebook_id = profile.id;

      // find the user in the database based on their facebook id
      User.findUserByFacebookId(facebook_id, function(err, user) {

        // if there is an error, stop everything and return that
        // i.e. an error connecting to the database
        if (err) return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user);
          } else {

            // if there is no user found with that facebook id, create them
            var newUser = {};

            // take information returned from facebook and using that data,
            // parse through it and make a newUser object.
            newUser.gender         = profile.gender;
            newUser.github_id      = 0;
            newUser.twitter_id     = 0;
            newUser.google_id      = 0;
            newUser.facebook_id    = profile.id;
            newUser.picture        = profile.photos[0].value + 0;
            newUser.username       = profile.displayName;

            // save our user to the database
            User.addUser(newUser, function(err, results) {
              if (err) throw err;

              // if successful, return the new user
              return done(null, results);
            });
          }
        });
      });
  }));
};

exports.isAuthenticated = function(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/#/signin');
}
