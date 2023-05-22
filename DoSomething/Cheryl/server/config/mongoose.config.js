const mongoose = require('mongoose');
// connect to your db (only need to change db name), if the db not exist the mongoose will create one for you
mongoose.connect('mongodb://127.0.0.1:27017/DoSomething', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));

    //Note: The useNewUrlParser and useUnifiedTopology are options we pass to get rid of deprecation messages in our terminal.
    //Note: If you connect to a database that doesn't exist, Mongoose will create the DB for you as soon as you create your first document!