const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../db/userModel");

// GET /api/user/list
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    res.json(users);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// GET /api/user/:id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(
      userId,
      "_id first_name last_name location description occupation"
    );
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
