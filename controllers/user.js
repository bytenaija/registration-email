const {
    verify,
    jwtSign
} = require('../config/jwt')
const EmailService = require('../services/EmailService')
const User = require('../models/user')
let url = require('url');
let uuidV4 = require('uuid/v4')
let AccountActivation = require('../models/accountActivation')

module.exports = {
    login: (req, res, next) => {
     
        const {
            email,
            password
        } = req.body;
        User.findOne({
                email
            })
            .then(user => {

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'Invalid credentials'
                    })
                } else {
                    if (user.activated) {

                        user.comparePassword(password, (err, isMatch) => {
                            if (err) {
                                // console.log(err)
                            } else if (isMatch) {
                                // console.log(isMatch)
                                jwtSign(user, (err, token) => {
                                    if (err) {
                                        return res.status(500).json({
                                            success: false,
                                            message: 'An error occured. Please try again later'
                                        })
                                    } else {

                                        res.status(200).json({
                                            success: true,
                                            user,
                                            token
                                        })
                                    }
                                });

                            } else {
                                return res.status(401).json({
                                    success: false,
                                    message: 'Invalid credentials'
                                })
                            }
                        });
                    } else {
                        res.status(401).json({
                            success: false,
                            message: "You must activate your account before login."
                        })
                    }

                }
            })
            .catch(err => {
                console.dir(err)
                return res.status(500).json({
                    success: false,
                    message: 'An error occured. Please try again later'
                })
            })
    },

    register: (req, res, next) => {
        const user = {
            email,
            password,
            role
        } = req.body;
        User.create(user).then(async user => {
                if (user) {

                    var requrl = url.format({
                        protocol: req.protocol,
                        host: req.get('host'),
                        pathname: '/verification/',
                    });
                    let code = uuidV4();
                    requrl = requrl + code;
                    await AccountActivation.create({
                        userId: user._id,
                        code
                    });
                    // console.log(requrl)
                    EmailService.email(email, requrl)
                    res.status(200).json({
                        success: true,
                        message: 'An account activation link has been sent to your email address. Kindly activate your account.'
                    })


                } else {
                    return res.status(404).json({
                        success: false,
                        message: 'Your account could not be created. Please try again'
                    })
                }

            })
            .catch(err => {
                console.dir(err)
                return res.status(500).json({
                    success: false,
                    message: 'An error occured. Please try again later'
                })
            })
    },

    emailVerification: (req, res) => {
        let {
            code
        } = req.params;

        AccountActivation.find({
            code
        }).then(account => {
            if (account) {
                // console.log(account[0].userId)
                User.findById(account[0].userId).then(async user => {
                    if (user) {
                        user.activated = true
                        user.save();
                        await AccountActivation.deleteOne({
                            _id: account[0]._id
                        })
                        res.json({
                            success: true,
                            message: "Account successfully activated"
                        })

                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Your validation link is invalid"
                        })
                    }

                })


            } else {
                res.status(400).json({
                    success: false,
                    message: "Your validation link is invalid"
                })
            }
        })
    },

    getUsers: (req, res, next) => {
        const verification = verify(req, res, next);
        if (verification) {

            if (verification.user.role == 'admin') {
                res.status(200).json({
                    success: true,
                    message: 'You are an an admin user and therefore can view all the users'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'You are an an not admin user.You do not have authorisation to view all users.'
                })
            }


        } else {
            res.status(401).json({
                success: false,
                message: 'You must be logged in to view this resource.'
            })
        }
    }
}