const express = require('express');
const Hackathon = require('../models/Hackathon');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all hackathons for a user
router.get('/', auth, async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ userId: req.user.userId });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hackathons', error: error.message });
  }
});

// Add a new hackathon
router.post('/', auth, async (req, res) => {
  try {
    const hackathon = new Hackathon({ ...req.body, userId: req.user.userId });
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: 'Error adding hackathon', error: error.message });
  }
});

// Update a hackathon
router.put('/:id', auth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hackathon', error: error.message });
  }
});

// Delete a hackathon
router.delete('/:id', auth, async (req, res) => {
  try {
    const hackathon = await Hackathon.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json({ message: 'Hackathon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hackathon', error: error.message });
  }
});

module.exports = router;