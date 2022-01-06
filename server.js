const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

const { postsRouter } = require("./routers/postsRouter");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan("short"));
app.use("/api/posts", postsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch:", err);
  }
  console.log(`Server works at port ${PORT}!`);
});
