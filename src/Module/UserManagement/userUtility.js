const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = {};

Token.generateAccressToken = async (user) => {
    try{
        // console.log(user);
        userPayload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = jwt.sign(
            userPayload,
            process.env.ACCESS_Token_SECRET,
            {expiresIn: '1h'}
        );
        // console.log(token);
        return token;
         
    }
    catch(error){
        console.log(error);
    }
},


Token.generateRefreshToken = async (user) => {
    try{
        // console.log(user);
        userPayload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = jwt.sign(
            userPayload,
            process.env.REFRESH_Token_SECRET,
            {expiresIn: '1h'}
        );
        // console.log(token);
        return token;
         
    }
    catch(error){
        // console.log(error);
    }
}
module.exports = Token;