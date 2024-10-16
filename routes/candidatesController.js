
const express = require("express");

const Candidate = require("../models/candidate.js");

const router = express.Router();

// Get a list of 50 comments
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

// Get a single comment
router.get("/:id", async (req, res) => {
  try{
    const candidate = await Candidate.findById(req.params.id);
    res.json(candidate).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  const candidate = new Candidate({
    forename: req.body.forename,
    surname: req.body.surname,
    email: req.body.email,
    demand: req.body.demand,
    skills: req.body.skills,
    experience: req.body.experience,
  });
  candidate.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err})
    });
});

// Update the post with a new comment
router.patch("/candidate/:id", async (req, res) => {
  try{
    const candidate = await Candidate.updateOne(
      {_id: req.params.id}, 
      {$set: {
          forename: req.body.forename,
          surname: req.body.surname,
          email: req.body.email,
          demand: req.body.demand,
          skills: req.body.skills,
          experience: req.body.experience,
        }
      }
    );
    res.json(candidate).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  try{
    const candidate = await Candidate.remove({ _id: req.params.id});
    res.json(candidate);
  } catch(error) {
    console.log(error);
    res.json({message: error});
  }
});

module.exports = router;