const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const loginController = require('../controllers/logincontrollers');
const logoutController = require('../controllers/logoutControllers');
const occurrenceController = require('../controllers/occurrenceControllers');

router.post('/users', userController.create);
router.get('/users/:id', userController.getData);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.post('/login', loginController.login);

router.post('/logout', logoutController.logout);

router.post('/occurrences', occurrenceController.create);
router.get('/occurrences', occurrenceController.listAll);
router.get('/occurrences/users/:id', occurrenceController.getOccurrence);
router.put('/occurrences/:id', occurrenceController.update);
router.delete('/occurrences/:id', occurrenceController.delete);

module.exports = router;