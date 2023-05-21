const ActivityController = require('../controllers/activity.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.get('/api/activity/:id', ActivityController.getActivityDetails);   
    app.get('/api/activities', ActivityController.getActivities); 
    // this route now has to be authenticated
    app.post('/api/activities', authenticate, ActivityController.createActivity);     /* This is new */
    app.put('/api/activity/edit/:id', authenticate, ActivityController.updateActivity);
    app.delete('/api/activity/delete/:id', authenticate, ActivityController.deleteActivity);
    // filter by userId
    app.get('/api/my-activities', authenticate, ActivityController.getMyActivities);
}

