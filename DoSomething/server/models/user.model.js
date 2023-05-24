const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
//install 'validator' through terminal and it is used to validate several format for us.
//{isEmail} is one function of it to check the email format is correct
const {isEmail} = require('validator');

//every time you see a 'new' key word means you are reacting with class in mongoose schema, 
//so later the middleware can use 'this' to refer to the class '

const UserSchema =  new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'First name is required'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required'],
        trim:true
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        validate:[isEmail, 'Invalid Email']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[8, 'Password must be 8 characters']
    },
    gender:{
        type:String
    },
    location:{
        type:String
    },
    aboutMe:{
        type:String
    }
}, {timestamps:true})

// * Middleware

//UserSchema must match the UserSchema above
//.virtual contain something only show in reg form but not going to store in the database for user model
//'this' refers to the new class
//set conformPassword as virtual 
UserSchema.virtual('confirmPassword')
.get(()=> this.confirmPassword)
.set((value)=>this.confirmPassword = value)

//then run pre() to check if the entered passwords match each other before go through form validation
UserSchema.pre('validate', function(next){
    if(this.confirmPassword !== this.password){
        this.invalidate('confirmPassword', 'Passwords not match')
    }
    next();//here means form validation
})

//if all entered form info are valid, it will create newUser 
//then hash pw before the newUser is saved to DB
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash =>{
            this.password = hash;
            next();
        });
})

module.exports = mongoose.model('User', UserSchema)
