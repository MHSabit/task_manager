const jwt = require('jsonwebtoken');

const taskUtility = {};

taskUtility.userInfoByAccessToken = (token) => {
    const user = jwt.decode(token);
    return user;
}

module.exports = taskUtility;