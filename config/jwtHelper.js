const jwt = require('jsonwebtoken');

// To verify user login token
module.exports.verifyJwtToken = (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
     var token;     
   // console.log(bearerHeader);
   if (bearerHeader){
       // console.log("11111");
        var bearer = bearerHeader.split(" ");
        token = bearer[2];
       // console.log(token)
     jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => 
            {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req.UserName = decoded.UserName;
                    next();
                }
            }
        )
    }

    
}

// To verify admin login token
module.exports.verifyJwtToken1 = (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
     var token;     
   // console.log(bearerHeader);
   if (bearerHeader){
       // console.log("11111");
        var bearer = bearerHeader.split(" ");
        token = bearer[2];
       // console.log(token)
     jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => 
            {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req.AdminName = decoded.AdminName;
                    next();
                }
            }
        )
    }

    
}