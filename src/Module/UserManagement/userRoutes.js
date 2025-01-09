const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.get('/', (req, res) => {
    res.send('User Routes');
});

router.post('/signup', userController.siginUp);
router.post('/signin', userController.signIn);
router.post('/signout', userController.signOut);

router.get('/allusers', userController.getAllUsers);

module.exports = router;