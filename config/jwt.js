const jwt = require('jsonwebtoken');

module.exports = {
    jwtSign : (user, cb) =>{
        jwt.sign({user}, process.env.JWT_SECRET, (err, token)=>{
            if(err) {
                cb(err)
            }else{
                cb(null, token)
            }
        })
    },

    jwtGet: (req, res, next) =>{

    }
}