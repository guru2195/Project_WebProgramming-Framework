const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /cars
// @desc    Get all cars
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

// @route   GET /cars/:id
// @desc    Get one car by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car' });
  }
});

// @route   POST /cars
// @desc    Add a new car
// @access  Admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add car' });
  }
});

// @route   PUT /cars/:id
// @desc    Update a car
// @access  Admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update car' });
  }
});

// @route   DELETE /cars/:id
// @desc    Delete a car
// @access  Admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

module.exports = router;
