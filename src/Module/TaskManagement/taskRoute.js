const taskRoute = require("express").Router();
const taskController = require("./taskcontroller");

taskRoute.get('/', (req, res) => {
    res.send('Task Routes');
});

// create a task
taskRoute.post('/', taskController.createTask);





module.exports = taskRoute;