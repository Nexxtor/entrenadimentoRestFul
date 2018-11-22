var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

/* GET users listing. */
// Read
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
// Create
router.post('/', UserController.insert);

// UPDATE
router.put('/:id', UserController.update);

// Delete
router.delete('/:id',UserController.delete);

module.exports = router;
