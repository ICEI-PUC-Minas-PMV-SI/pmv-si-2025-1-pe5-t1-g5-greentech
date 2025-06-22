

import { PORT } from "@config/env";

import "../app";

import chalk from "@utils/colors";
import { httpsServer } from "./index";

const at = "🐿️\t";

httpsServer.listen(PORT, () => console.info(
  chalk.blue(`${at} Yey! at Express is listening at https://localhost:${PORT}`),
));
