const logger = require("./logger");

const unknownEndpoint = (req, res) =>
  res.send(404).json({ error: "The Page does not exist" });

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  res.send(404).json({ error: "Some error occured" });
};

module.exports = { unknownEndpoint, errorHandler };
