const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/logincontrollers');
const logoutController = require('../controllers/logoutControllers');
const occurrenceController = require('../controllers/occurrenceControllers');

router.post('/users', userController.create);
router.post('/update/:id', userController.update);
router.get('/delete/:id', userController.delete);
router.get('/edit/:id', userController.edit);
router.get('/listAll',userController.listAllUsers);

router.post('/login', loginController.login);

router.post('/logout', logoutController.logout);

router.post('/occurrences', occurrenceController.create);
router.get('/occurrences', occurrenceController.listAll);

module.exports = router;