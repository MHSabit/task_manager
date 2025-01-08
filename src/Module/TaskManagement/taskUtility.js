const jwt = require('jsonwebtoken');

const taskUtility = {};

taskUtility.userInfo =(token)=> {
    const user = jwt.decode(token);
    console.log(user);
    return user;
}

module.exports = taskUtility;