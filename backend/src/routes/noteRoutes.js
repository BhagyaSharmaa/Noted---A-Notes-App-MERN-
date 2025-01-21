import express from 'express';
import Note from '../models/note.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Create a new note
router.post('/', verifyToken, async (req, res) => {
  const { content } = req.body;

  try {
    const note = new Note({ userId: req.userId, content });
    await note.save();
    res.status(201).json({ message: 'Note saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving note.' });
  }
});

// Get all notes for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes.' });
  }
});

export default router;
