const mongoose = require('mongoose');
const bcrypt = require('bycrypt');

const userSchema = mongoose.Schema({
    email: {
        type: 'String',
        required: true
    },

    password: {
        type: 'String',
        required: true
    },

    role: {
        type: 'String',
        required: true
    }
})

userSchema.pre('save', (next) =>{
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) throw (err)
        bcrypt.hash(user.password, salt, (err, hash) =>{
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = (password) =>{
    
    bcrypt.compare(this.password, password, (err, result) =>
    {
        if(err) throw (err);
        if(result){
            return true;
        }else{
            return false;
        }
    })
}

module.exports = mongoose.model('User', userSchema);