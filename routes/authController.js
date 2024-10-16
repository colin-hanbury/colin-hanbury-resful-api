const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const User = require("../models/user.js");

const router = express.Router();


router.post("/register", async (req, res) => {
    try{
        // Get user input
        const { forename, surname, email, password } = req.body;

        // Validate user input
        if (!(forename && surname && email && password)) {

            res.status(400).send("All input is required");
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            forename: req.body.forename,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword
        });
        user.save()
            .then(data => {
                res.status(201).json({ message: 'User registered successfully' });
            })
            .catch(err => {
                res.status(501).json({message: err})
            });
    } 
    catch (err) {
        console.log(err);
        res.status(501).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
      // Check if the email exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, 'secret');
      user.password = null;
      user.token = token;
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
    try{
        const user = await User.remove({ _id: req.params.id});
        res.json(user);
    } catch(error) {
        console.log(error);
        res.json({message: error});
    }
});

  // Middleware for JWT validation
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  };

  module.exports = router;
// const token = jwt.sign({ email: user.email }, 'secret');
