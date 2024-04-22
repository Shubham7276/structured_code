const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ ...req.body, password: hashedPassword});
        await newUser.save();
        // const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        res.status(201).json({ data : newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
  };

module.exports = {
    signup, login
};
