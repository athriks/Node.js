const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
   
   UserName :{
        type : String,
         unique: true
        
   },

    email : {

        type : String,
         required : "Email Can't be empty",
          lowercase: true,
           unique: true
    },

    address :{

        type : String
    },
     role:{

        type : String,
         enum :['user','admin'],
         default :'user',
          description: "can only be one of the enum values"
    },

    password :{

        type : String,
         minlength : [5,"Password Should Contain minimum of 5 Character"]
    },
    
    saltSecrets : String,

    mnemonics : {

        type : String
    },
      date:{
        type :Date
    }

    }, 
    
    {
     timestamps: true
});


// email validation

userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

 
// Methods
userSchema.methods.verifyPassword = function (password) {
     console.log(password)
      console.log(this.password)
    return bcrypt.compareSync(password, this.password);
     
};
  
  userSchema.methods.verifyrole = function (role) {
    //  console.log(role)
    //    console.log(this.role)

       if(role ==this.role)
       return role;
     
};
  


userSchema.methods.generateJwt = function () {
    return jwt.sign({  
                      UserName :this.UserName,
                      password : this.password
                      
                      },
                    
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

module.exports = mongoose.model('User', userSchema);