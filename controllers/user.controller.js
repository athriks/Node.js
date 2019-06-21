const mongoose = require('mongoose');
const passport = require('passport');
const Web3 = require('web3');
// const ganache = require("ganache-cli");
// const web3 = new Web3(ganache.provider());
// geth:

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const User = mongoose.model('User');
const bip39 = require('bip39');
const _ = require('lodash');



// to register.
module.exports.register = (req, res, next) => {

    let a =web3.eth.personal.newAccount(req.body.password).then(
        (data)=>{console.log(data)},
        (err)=>{console.log(err)}

    );
    
    var user = new User({

    UserName: req.body.UserName,
    email: req.body.email,
    password : req.body.password,
    address : this.data,
    mnemonics : bip39.generateMnemonic(),
    role : req.body.role,
    date : new Date()

 })
   
     // to save in mongodb
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate  found.']);
            else
                return next(err);
        }

    })
}

module.exports.getAccounts =  (req, res, next) => {

web3.eth.getAccounts().then( result => res.status(200).send(result))
  
        };


 /// to login or authenticate
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
    
}
 

 // user protected router for verify token

 module.exports.userProfile = (req, res, next) =>{
    User.findOne({ UserName: req.UserName},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
           
            else
                return res.status(200).json({ status: true, message: 'Welcome to the Your Profile',user : _.pick(user,['UserName','email','address','mnemonics','role']) });
        }
    );
} 

