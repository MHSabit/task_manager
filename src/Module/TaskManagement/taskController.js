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
        console.log(taskPayload);
        const createTask = await TaskModel.create(taskPayload);
        res.send(createTask);
    }
    catch (error) {
        console.log(error);
    }
}


// update a task
taskController.updateTask = async (req, res) => {
    const updateTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send(updateTask);
}

// delete a task
taskController.deleteTask = async (req, res) => {
    const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
    res.send(deleteTask);
}


module.exports = taskController;