const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/Blog");

const app = express();

mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => logger.info("Database is Successfully connected"))
  .catch((err) => logger.error(err));

app.use(express.json());

app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => res.json({ message: "welcome to bloglist" }));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
