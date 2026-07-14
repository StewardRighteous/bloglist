const config = require("./utils/config");
const app = require("./app");
const logger = require("./utils/logger");

app.listen(config.PORT, (req, res) =>
  logger.info(`Starting in ${config.PORT}`),
);
