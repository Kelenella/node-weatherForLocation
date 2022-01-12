require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { connectMongo } = require("./src/db/connection");
const { postsRouter } = require("./src/routers/postsRouter");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(morgan("short"));
app.use("/api/posts", postsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const start = async () => {
  await connectMongo();
  app.listen(PORT, (err) => {
    if (err) {
      console.error("Error at server launch:", err);
    }
    console.log(`Server works at port ${PORT}!`);
  });
};

start();
