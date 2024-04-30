const express = require('express');
const router = express.Router();
const userController = require('../Controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Create a new user (no authentication required for signup)
router.post('/', userController.createUser);

// Protected routes (require authentication)
// router.use(authMiddleware); // Apply authMiddleware to all routes below this line

// Get all users
router.get('/', userController.getUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
