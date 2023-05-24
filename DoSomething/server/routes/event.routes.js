const EventController = require('../controllers/event.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.get('/api/event/:id', EventController.getEventDetails);   
    app.get('/api/events', EventController.getEvents); 
    // this route now has to be authenticated
    app.post('/api/events', authenticate, EventController.createEvent);     /* This is new */
    app.put('/api/event/edit/:id', authenticate, EventController.updateEvent);
    app.delete('/api/event/delete/:id', authenticate, EventController.deleteEvent);
    // filter by userId
    app.get('/api/my-events', authenticate, EventController.getMyEvents);
}

