const jwt = require("jsonwebtoken");
require('dotenv').config();
currentUserId = null;
module.exports.secret = process.env.SECRET_KEY;
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({verified: false});
    } else {
      currentUserId = payload._id;
      next();
    }
  });
}