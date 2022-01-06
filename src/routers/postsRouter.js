const express = require("express");
const router = express.Router();

const { addPostValidation } = require("../middlewares/validationMiddleware");
const {
  getPosts,
  getPostById,
  addNewPost,
  changePost,
  deletePost,
} = require("../controllers/postsController");

//GET for /api/posts - получить список всех постов
router.get("/", getPosts);

//GET for /api/posts/id - получить пост по id
router.get("/:id", getPostById);

router.post("/", addPostValidation, addNewPost);

router.put("/:id", addPostValidation, changePost);

router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
