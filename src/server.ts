import app from "./app/app.js";
import { config } from "./app/config/env.js";
import { logger } from "./app/config/logger.js";
const port = config.PORT;
app.listen(port, () => {
  logger.info(`server is running on port: ${port}`);
});
