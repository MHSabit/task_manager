const taskRoute = require("express").Router();
const taskController = require("./taskcontroller");

taskRoute.get('/', (req, res) => {
    res.send('Task Routes');
});

// create a task
taskRoute.post('/', taskController.createTask);

// update a task
taskRoute.put('/:id', taskController.updateTask);

// delete a task
taskRoute.delete('/:id', taskController.deleteTask);


module.exports = taskRoute;