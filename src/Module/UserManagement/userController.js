const userController = {};
const userUtility = require("./userUtility");
const UserModel = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


userController.siginUp = async (req, res) => {
    try{

        const existingUser = await UserModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(400).json({
                message: 'Email ID already associated with a user'
            });
        }
        const user = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        const createUser = await UserModel.create(user);
        const resPayload = {
            user_id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            role : createUser.role
        }
        res.send(resPayload);
    }
    catch(error){
        console.log(error);
    }
}



userController.signIn = async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({
            message: 'Email ID not associated with a user'
        });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(400).json({
            message: 'Invalid Credentials'
        });
    }
    const acessToken = await userUtility.generateAccressToken(user);
    const refreshToken = await userUtility.generateRefreshToken(user);
    const responsePayload = {
        user_id: user._id,
        user_name: user.name,
        email: user.email,
        role: user.role,
        acessToken: acessToken,
        refreshToken: refreshToken
    };
    res.send(responsePayload);
}

userController.signOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Could not log out.');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.send('Logged out successfully.')
    });
}

userController.getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find();
        res.send(allUsers);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error retrieving users' });
    }
}


userController.checkOAuth = (req, res) => {
    const accessToken = req.headers.authorization;
    try {
        const jwtVerify = jwt.verify(accessToken, process.env.ACCESS_Token_SECRET);
        if(jwtVerify){
            res.send(jwtVerify);
        }
    }
    catch(error){
        console.log(error);
        res.status(400).send({message: 'Invalid access token'});
    }
}




userController.generateAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return res.status(400).json({
            message: 'Refresh token is required'
        });
    }
    else{
        const verifyRefreshToken = userUtility.verifyRefreshToken(refreshToken);
        console.log('verifyRefreshToken', verifyRefreshToken);
        const user = {
            id: verifyRefreshToken.id,
            name: verifyRefreshToken.name,
            email: verifyRefreshToken.email
        }
        console.log(user);
        const generateAccessToken = userUtility.generateAccressToken(user);
        const generateRefreshToken = userUtility.generateRefreshToken(user);

        res.status(200).json({
            message: 'Access token generated successfully',
            accessToken: generateAccessToken,
            refreshToken: generateRefreshToken
        });
    }

}


module.exports = userController;
