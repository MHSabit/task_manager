const TaskModel = require("./taskSchema");
const taskUtility = require("./taskUtility");
const taskController = {};

taskController.createTask = async (req, res) => {
    console.log(req.body);
    console.log(req.headers.authorization);
    const user = taskUtility.userInfo(req.headers.authorization);
    const createTask = await TaskModel.create(req.body);
    res.send(createTask);
}

taskController.updateTask = async()=> {
}

module.exports = taskController;