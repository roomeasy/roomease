// Setting up passport.
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../user/userModel.js');
var configAuth = process.env.DATABASE_URL ? null : require('./auth.js');

var callbackURL = process.env.DATABASE_URL ? "http://roomeasy-staging.herokuapp.com/auth/github/callback" : "http://localhost:3000/auth/facebook/callback"


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      // console.log("User within serialize :", user);
      done(null, user.facebook_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(facebook_id, done) {
      // console.log("id being checked in deserialize : ", facebook_id);
      User.findUserByFacebookId(facebook_id, function(err, user) {
        // console.log(user);
        //if found
        if (user) {
          //give back full user info
          done(null, user);
        }
        //else, return error
        else {
          done(err, null);
        }
      });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : process.env.FACEBOOK_CLIENT_ID || configAuth.facebookAuth.clientID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET || configAuth.facebookAuth.clientSecret,
        callbackURL     : callbackURL,
        profileFields   : ['id', 'displayName', 'gender', 'profileUrl', 'picture.type(large)', 'friends']
    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        // console.log("Profile about to get searched : returned from fb. ", profile);

        // asynchronous
        process.nextTick(function() {
            var facebook_id = profile.id;
            // find the user in the database based on their facebook id
            User.findUserByFacebookId(facebook_id, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = {};

                    // set all of the facebook information in our user model
                    newUser.gender = profile.gender;
                    newUser.facebook_id    = profile.id; // set the users facebook id
                    newUser.picture = profile.photos[0].value; //set their picture
                    newUser.username  = profile.displayName; // look at the passport user profile to see how names are returned
                    // newUser.facebook_email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    User.addFacebookUser(newUser, function(err, results) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));

};