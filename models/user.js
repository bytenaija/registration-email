const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: 'String',
        required: true,
        unique:true
    },

    password: {
        type: 'String',
        required: true
    },

    role: {
        type: 'String',
        required: true
    },

    activated:{
        type: 'Boolean',
        default: false
    }
})

userSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();
    let user = this;
   
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) throw (err)
        bcrypt.hash(user.password, salt, (err, hash) =>{
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(password, next){
    console.log(this.password)
    bcrypt.compare(password, this.password, (err, result) =>
    {
        if(err){
            console.log(err)
            next(err);
        } 
        console.log(result)
        next(null, result);
       
    })
}

module.exports = mongoose.model('User', userSchema);