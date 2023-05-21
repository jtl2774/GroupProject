const User = require('../models/user.model');    /* this is new */
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
require('dotenv').config();
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.register = (req, res) => {
    let error = 'Passwords do not match';
    if (req.body.cwPassword != req.body.password) {
        return res.status(400).json({ message: error, error: error });
    }

    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
 
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", username: user.userName, _id: user._id });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err, error: err})
    });
}

module.exports.login = (req, res) => {
    User.findOne({ email: req.body.loginEmail })
        .then(async user => {
            let loginError = 'Invalid Email Address';
            if(user === null) {
                // email not found in users collection
                return res.status(400).json({ message: loginError, error: loginError });
            }
         
            // if we made it this far, we found a user with this email address
            // let's compare the supplied password to the hashed password in the database
            const correctPassword = await bcrypt.compare(req.body.loginPassword, user.password);

            if(!correctPassword) {
                // password wasn't a match!
                loginError = 'Invalid Password';
                return res.status(400).json({ message: loginError, error: loginError });
            }
            
            // if we made it this far, the password was correct
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
         
            // note that the response object allows chained calls to cookie and json
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "success!", username: user.userName, _id: user._id });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Invalid Login Credentials', error: err })
        });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getDetail = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(async (oneSingleUser) => {
            let subscription = {
                "_id": oneSingleUser._id,
                "firstName": oneSingleUser.firstName,
                "gender": oneSingleUser.gender,
                "location": oneSingleUser.location,
                "aboutMe": oneSingleUser.aboutMe,
                "picture": oneSingleUser.picture,
            }
            res.json({participant: subscription})
        })
        .catch((err) => {
            res.json({ message: 'User Not Found', error: err })
        });
}

module.exports.getAll = (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json({ user: allUsers })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}