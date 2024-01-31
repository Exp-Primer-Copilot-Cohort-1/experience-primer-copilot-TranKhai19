// Create web server

// Import express
const express = require("express");
const router = express.Router();

// Import model
const Comment = require("../models/Comment");

// Import validation
const { commentValidation } = require("../validation");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get specific comment
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post comment
router.post("/", async (req, res) => {
  // Validate data before create new comment
  const { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create new comment
  const comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
  });

  // Save comment to database
  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update comment
router.patch("/:commentId", async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne(
      { _id: req.params.commentId },
      { $set: { content: req.body.content } }
    );
    res.json(updatedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete comment
router.delete("/:commentId", async (req, res) => {
  try {
    const removedComment = await Comment.remove({ _id: req.params.commentId });
    res.json(removedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;