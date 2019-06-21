
// USER
const passport = require('passport');
const localStrategy = require('passport-local-roles').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');



// middleware to authenticate
passport.use(
    new localStrategy({  usernameField: 'UserName',
                             roleField: 'role',
                             passportField:'password' },
        (username, password, role, done) => {
            User.findOne({ UserName:username},
                (err, user) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'UserName is Not Found please check!!' });
                        //role
                     else if (!user.verifyrole(role))
                    return done(null, false, { message: 'Role is invalid' });

                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, user);
                });
        })
);
