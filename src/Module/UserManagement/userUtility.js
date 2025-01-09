const jwt = require('jsonwebtoken');
require('dotenv').config();

const Token = {};

Token.generateAccressToken = async (user) => {
    try{
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
        return token;
         
    }
    catch(error){
        console.log(error);
    }
},


Token.generateRefreshToken = async (user) => {
    try{
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
        return token;
         
    }
    catch(error){
        console.log(error);
    }
}
module.exports = Token;