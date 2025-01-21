import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

// Environment variables or fallback values
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.status(201).json({ message: 'User created successfully!', token });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user.' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in.' });
  }
});

// Protected Route
router.get('/protected', protectRoute, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
