const express = require("express");
const app = express();
//import cors and invoke it with app.use
const cors = require('cors');
app.use(cors({credentials:true, origin:'http://localhost:3000'})); //also need cors to send cookie to client

//in order for cookie to send back to the server we need cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//BRINGING OUR CONFIG: 
//calling the mongoose.config and running the connection function    
require("./config/mongoose.config");
// we dont always need to required file as variable. you can require it directly 
//once required, the system will run it (in this case the mongoose.config is to connect to db and no need to return anything)    

// to use .env
require('dotenv').config();

//the middleware to handle post request    
app.use(express.json(), express.urlencoded({ extended: true }));

//*BRINING THE ROUTES: all the routes needs to be invoked
//*then we store all the routes and functions in TvShowRoutes variable

const UserRoutes =require('./routes/user.routes');
UserRoutes(app);

//running the function and pass in the app as paremeter(since the route only has one parameter)
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));