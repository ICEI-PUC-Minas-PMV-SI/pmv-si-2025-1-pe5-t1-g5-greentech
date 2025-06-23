

import { PORT } from "@config/env";

import "../app";

import chalk from "@utils/colors";
import { httpServer } from "./index";

const at = "🐿️\t";

httpServer.listen(PORT, () => console.info(
  chalk.blue(`${at} Yey! at Express is listening at http://localhost:${PORT}`),
));
