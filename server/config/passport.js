// Setting up passport.
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/userModel.js');

//if in heroku environment, user their variables, if not, use our own from auth.js file.
var auth = process.env.DATABASE_URL ? null : require('./auth.js');
var callbackURL = process.env.DATABASE_URL ? "http://roomeasy-staging.herokuapp.com/auth/facebook/callback" : "http://localhost:3000/auth/facebook/callback";

module.exports = function(passport) {

  // used to serialize the user for the session
  // this happens when a user first visits the site and logs in via facebook
  passport.serializeUser(function(user, done) {
    done(null, user.facebook_id);
  });

  // used to deserialize the user
  // this happens on every request so we know which user is logged in.
  passport.deserializeUser(function(facebook_id, done) {
    User.findUserByFacebookId(facebook_id, function(err, user) {

      // if user is found within sessions, they can proceed with request
      // if not, returns error
      user ? done(null, user) : done(err, null);
    });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(new FacebookStrategy({

    // pull in our app id and secret from either heroku or our auth.js file.
    clientID        : process.env.FACEBOOK_CLIENT_ID || auth.facebookAuth.clientID,
    clientSecret    : process.env.FACEBOOK_CLIENT_SECRET || auth.facebookAuth.clientSecret,
    callbackURL     : callbackURL,
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
            newUser.facebook_id    = profile.id;
            newUser.picture        = profile.photos[0].value;
            newUser.username       = profile.displayName;

            // save our user to the database
            User.addFacebookUser(newUser, function(err, results) {
              if (err) throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      });
  }));
};

