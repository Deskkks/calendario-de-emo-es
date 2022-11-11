const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: '373148680879-rrs8s6g7o8cvpgequsp0srm5o6avairf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://localhost:8081/google/callback",

  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
