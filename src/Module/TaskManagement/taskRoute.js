
const taskController = require("./taskController");
const taskRoute = require("express").Router();

taskRoute.get('/', (req, res) => {
    res.send('Task Routes');
});

// create a task
taskRoute.post('/', taskController.createTask);

// update a task
taskRoute.put('/:id', taskController.updateTask);

// delete a task
taskRoute.delete('/:id', taskController.deleteTask);

// get all tasks
taskRoute.get('/all', taskController.getAllTasks);

// get task by id
taskRoute.get('/:id', taskController.getTaskById);

// get task createdby user
taskRoute.get('/user/:id', taskController.getTaskCreatedByUser);


module.exports = taskRoute;