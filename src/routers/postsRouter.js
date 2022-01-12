const express = require("express");
const router = express.Router();

const { addPostValidation } = require("../middlewares/validationMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");

const modelsMiddleware = require("../middlewares/models");
const {
  getPosts,
  getPostById,
  addNewPost,
  changePost,
  deletePost,
} = require("../controllers/postsController");

router.use(modelsMiddleware);

router.get("/", asyncWrapper(getPosts));

router.get("/:id", asyncWrapper(getPostById));

router.post("/", addPostValidation, asyncWrapper(addNewPost));

router.put("/:id", addPostValidation, asyncWrapper(changePost));

router.delete("/:id", asyncWrapper(deletePost));

module.exports = { postsRouter: router };
