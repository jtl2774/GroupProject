const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    gender: {
      type: String,
      required: [true, "Gender is required"]
    },
    location: {
      type: String,
      required: [true, "Location is required"]
    },
    aboutMe: {
      type: String,
      required: [true, "About me is required"]
    },
    picture: {
      type: String,
      required: [true, "Picture is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already in use"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});
  
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
 
module.exports = User;
