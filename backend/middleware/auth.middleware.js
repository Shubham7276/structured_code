const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      req.userId = decodedToken.userId; // Attach the user ID to the request object
      next(); // Move to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
};

// router.get('/dashboard', authMiddleware, (req, res) => {
//     // Access the userId from req.userId to fetch user-specific data or perform actions
//     const userId = req.userId;
//     // Return data or perform actions based on the authorized user
//     res.json({ message: `Welcome to the dashboard, user ${userId}` });
//   });
  
module.exports = authMiddleware;