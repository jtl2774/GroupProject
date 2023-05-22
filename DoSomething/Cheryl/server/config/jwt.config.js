// need this file to decode userToken and tide user to tvshow
// in short, autheticate user  and then set authetication in tvShow.routes.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    // console.log('*****************', req.headers)
    //! req.cookies.userToken, set up payload with cookies.userToken using SECRET_KEY to encoode the info into payload

    jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
        console.log(req.cookies);
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            console.log("Autheticated");
            //req.user = payload._id
            console.log("PAYLOAD", payload)
            next();
        }
    });
}

    