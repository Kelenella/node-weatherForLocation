const express = require("express");
const router = express.Router();
const shortid = require("shortid");

const { addPostValidation } = require("../middlewares/validationMiddleware");

let posts = [
  { id: "1", topic: "test1", text: "test text1" },
  { id: "2", topic: "test2", text: "test text2" },
  { id: "3", topic: "test3", text: "test text3" },
];
//GET for /api/posts - получить список всех постов
router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

//GET for /api/posts/id - получить пост по id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter((item) => item.id === id);
  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id '${id}' found` });
  }
  res.json({ post, status: "success" });
});

router.post("/", addPostValidation, (req, res) => {
  const { topic, text } = req.body;
  posts.push({ id: shortid.generate(), topic, text });
  res.json({ status: "success" });
});

router.put("/:id", addPostValidation, (req, res) => {
  const { topic, text } = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({ status: "success" });
});

router.delete("/:id", (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({ status: "success" });
});

module.exports = { postsRouter: router };