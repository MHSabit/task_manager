const jwt = require('jsonwebtoken');
require('dotenv').config();
const taskUtility = require('./taskUtility');
const taskMiddleWare = {};
const taskModel = require('./taskSchema');
const UserModel = require('../UserManagement/userSchema');

taskMiddleWare.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_Token_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).send('Unauthorized');
    }
}

taskMiddleWare.verifyUser = async (req, res, next) => { 
    const user = taskUtility.userInfoByAccessToken(req.headers.authorization);
    const UserfromDB = await UserModel.findById(user.id);
    const task = await taskModel.findById(req.params.id);
    const taskCreatedbyUser = task.CreatedByUser.toString();
    task.assignedTo ? task.assignedTo.toString() : null; 

    if(taskCreatedbyUser == user.id || task.assignedTo == user.id || UserfromDB.role == 'admin'){
        next();
    }
    else{
        res.status(401).send('You are not authorized to perform this action for this task');
    }
}



module.exports = taskMiddleWare;