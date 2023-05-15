const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

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

module.exports = router;