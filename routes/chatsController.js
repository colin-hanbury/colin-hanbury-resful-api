const log = require("console");
const express  = require("express");

// import http from "http";
// const server = http.createServer(app);
// import { Server } from "socket.io";
// const io = new Server(server);

const router = express.Router();

// io.on('/', async (socket) => {
//   let collection = await db.collection("visitors");
//   let changeStream = collection.watch();
//   changeStream.on("change", change => io.emit(change));

// });

// Get a list of 10 visitors
router.get("/", async (req, res) => {
    let collection = await db.collection("visitors");
    let results = await collection.find()
      .limit(10)
      .toArray();
  
    res.send(results).status(200);
  });

  // Search for a visitor
  router.get("/:id", async (req, res) => {
    let collection = await db.collection("visitors");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

router.post("/", async (req, res) => {
    try{
        let collection = await db.collection("visitors");
        let newVisitor = req.body;
        newVisitor.date = new Date();
        let result = await collection.insertOne(newVisitor);
        res.send(result).status(204);
    }
    catch(e){
        res.send(e).status(404);
    }
});


// Update the visitor with a new comment
router.patch("/visitor/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
      $push: { comments: req.body }
  };
  
  let collection = await db.collection("visitors");
  let result = await collection.updateOne(query, updates);
  
  res.send(result).status(200);
});
    
    // Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  
  const collection = db.collection("visitors");
  let result = await collection.deleteOne(query);
  
  res.send(result).status(200);
});
    
module.exports = router;