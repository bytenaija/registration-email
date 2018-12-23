const jwt = require('jsonwebtoken');
module.exports ={
  jwtSign : (user, cb) =>{
    // console.log("JWT", user)
    jwt.sign({user}, process.env.JWT_SECRET, (err, token)=>{
      if(err){
        cb(err)
      } else{
        cb(null, token)
      }

    })
  },


verifyToken: (req, res, next)=> {
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        next()
    }
},

verify: (req, res, next) => {
    
    return jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            return false
        } else {

            return authData;
        }


    });
}
}
