const mongoose =require('mongoose');

const EventSchema =  new mongoose.Schema({
    userId: {
        type: String,
        required:  [
            true
        ],
        trim: true
    },
    location:{
        type: String,
        required: [true, 'Location is required'],
        minLength: [2,'Location must be 2 or more characters']
    },
    activity:{
        type: String,
        required: [true, 'Activity is required'],
        minLength: [2,'Activity must be 2 or more characters']
    },
    date:{
        type:Date,
        required: [true, 'Date is required'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
        minLength: [3,'Address must be 3 or more characters']
    },
    desc:{
        type: String,
        required: [true, 'Address is required'],
        minLength: [3,'Description must be 3 or more characters']
    }

}, {timestamps:true})

module.exports = mongoose.model('Event', EventSchema )