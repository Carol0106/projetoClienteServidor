const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/teste', userController.test);
router.get('/details', userController.details);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

module.exports = router;