const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

// GET /api/photo/user/:id
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    const photos = await Photo.find({ user_id: userId }).lean();

    await Promise.all(
      photos.map(async (photo) => {
        await Promise.all(
          photo.comments.map(async (comment) => {
            const commentUser = await User.findById(
              comment.user_id,
              "_id first_name last_name"
            );
            comment.user = commentUser
              ? {
                  _id: commentUser._id,
                  first_name: commentUser.first_name,
                  last_name: commentUser.last_name,
                }
              : null;
            delete comment.user_id;
          })
        );
      })
    );

    res.json(photos);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
