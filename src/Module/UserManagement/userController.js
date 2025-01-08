const userController = {};
const userUtility = require("./userUtility");
const UserModel = require("./userSchema");
const bcrypt = require("bcrypt");


userController.siginUp = async (req, res) => {
    try{

        const existingUser = await UserModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(400).json({
                message: 'Email ID already associated with a user'
            });
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        }
        const createUser = await UserModel.create(user);
        res.send(createUser);
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
        user: user,
        acessToken: acessToken,
        refreshToken: refreshToken
    };
    res.send(responsePayload);
}

userController.signOut = (req, res) => {
    res.send('User Signout');
}

module.exports = userController;
