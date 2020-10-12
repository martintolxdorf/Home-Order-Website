const express = require('express'),
    userRouter = new express.Router(),
    userController = require('../controllers/users.js'),
    verifyToken = require('../authHelperFunctions').verifyToken,
    User = require('../models/user.js');


userRouter.route('/').get(userController.index).post(userController.create);

userRouter.post('/authenticate', userController.authenticate);

userRouter.post('/updateUser', userController.update);

userRouter.get('/:username', async (req, res) => {
    User.findById(req.params.username)
    .then((user) => {
        if(!user) {
            return res.json({
                error: 'Error message'
            });
        } else {
            return res.json({user});
        }
    })
    .catch((error) => {
        return res.json({
            message: "error",
        });
    });
});

userRouter.use(verifyToken);
userRouter.route('/:id').get(userController.show).patch(userController.update).delete(userController.destroy);
  
module.exports = userRouter;