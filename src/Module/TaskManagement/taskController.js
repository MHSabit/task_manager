const TaskModel = require("./taskSchema");
const taskUtility = require("./taskUtility");
const taskController = {};


// create a task
taskController.createTask = async (req, res) => {
    try {
        const user = taskUtility.userInfoByAccessToken(req.headers.authorization);
        const taskPayload = {
            ...req.body,
            CreatedByUser: user.id
        };
        const createTask = await TaskModel.create(taskPayload);
        res.send(createTask);
    }
    catch (error) {
        console.log(error);
    }
}


// update a task
taskController.updateTask = async (req, res) => {
    try {

        if(req.params.id){
            const updateTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.send(updateTask);
        }
    }
    catch (error) {
        console.log(error);
    }

}

// delete a task
taskController.deleteTask = async (req, res) => {
    try {
        if(req.params.id){
            const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
            res.send(deleteTask);
        }
    }
    catch (error) {
        console.log(error);
    }
}

// get all tasks
taskController.getAllTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);
}

// get task by id
taskController.getTaskById = async (req, res) => {
    const task  = await TaskModel.findById(req.params.id); 
    res.send(task);
}


// get task created by user
taskController.getTaskCreatedByUser = async (req, res) => {
    const tasks = await TaskModel.find({ CreatedByUser: req.params.id });
    res.send(tasks);
};


module.exports = taskController;