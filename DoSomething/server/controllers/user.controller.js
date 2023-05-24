const User = require('../models/user.model');
// need to import tools for creating cookies
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//using async/await instead of .then/.catch
//register user controller
module.exports = {
    registerUser: async (req, res) =>{
        try{

            console.log("HERE WE ARE");
            //check if the email already exsited
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                res.status(400).json({errors: {email: {message:'Email already exsits please login'}} })
                // ! need to set json as this format to match the error message format in component Register
            }else{
                //create user
                const newUser = await User.create(req.body)

                //Generate userToken (store user id/first name/email)=>encode using secret key=> valid for 2 hour

                const userToken = jwt.sign({_id:newUser._id, email:newUser.email, firstName: newUser.firstName}, secret, {expiresIn:'2h'});
                console.log(userToken);

                //sending user data back to the client (for credential) 
                //create cookie with key userToken and value is the userToken we just created
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },
    
    loginUser: async (req, res) =>{
        try{
            //check if the user in db
            const user = await User.findOne({email:req.body.email});
            if(user){
                //check if pw match
                const pwMatch = await bcrypt.compare(req.body.password, user.password)
                if(pwMatch){
                    //generate userToken/cookies
                    const userToken = jwt.sign({_id:user._id, email:user.email, firstName: user.firstName}, process.env.SECRET_KEY, {expiresIn:'2h'})
                    console.log(userToken)
                    res.cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json({ firstName: user.firstName, _id: user._id })
                }else{
                    //if the email does not exist
                    res.status(400).json({message:'Invalid email/password'})
                }
            }else{
                res.status(400).json({message:'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    //log out user
    LogoutUser: (req, res) =>{
        res.clearCookie('userToken').json({message:'You logged out'})
    },

    getDetail: async (req, res) => {
        User.findOne({_id: req.params.id})
            .then(async (oneSingleUser) => {
                let subscription = {
                    "_id": oneSingleUser._id,
                    "firstName": oneSingleUser.firstName,
                    "gender": oneSingleUser.gender,
                    "location": oneSingleUser.location,
                    "aboutMe": oneSingleUser.aboutMe
                }
                res.json({participant: subscription})
            })
            .catch((err) => {
                res.json({ message: 'User Not Found', error: err })
            });
    },

    getAll: async (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json({ user: allUsers })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
}