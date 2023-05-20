const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/logincontrollers');
const logoutController = require('../controllers/logoutControllers');

router.get('/teste', userController.test);
router.get('/details', userController.details);
router.post('/users', userController.create);
router.post('/update/:id', userController.update);
router.get('/delete/:id', userController.delete);
router.get('/edit/:id', userController.edit);
router.get('/listAll',userController.listAllUsers);
router.post('/exemplo', (req,res) => {
    console.log(req.body);
    res.send('success!');
});

router.post('/login', loginController.login);
router.post('/logout', logoutController.logout);


module.exports = router;