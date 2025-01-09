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
    res.send('User Signout');
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


module.exports = userController;
