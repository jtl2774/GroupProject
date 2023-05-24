// inside of user.routes.js
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
 app.get("/api/user/:id", UserController.getDetail)
 app.get("/api/users", authenticate, UserController.getAll)
 app.post('/api/register', UserController.registerUser)
 app.post('/api/login', UserController.loginUser)
 app.post('/api/logout', UserController.LogoutUser)

}

