var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.read);
router.get('/:id', userController.detail);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.del);

module.exports = router;
