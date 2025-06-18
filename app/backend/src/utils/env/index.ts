/* eslint-disable no-restricted-syntax */
import { Config, ConfigOutput, EnviromentParseError } from "@utils/env/types";
import "dotenv/config";

export const envConfig = <C extends Config>(config: C): ConfigOutput<C> => {
  const { env } = process;

  const entries = Object.entries(config);

  return entries.reduce((conf, [name, entry]) => {
    if (!Array.isArray(entry)) {
      conf[name as keyof C] = envConfig(entry) as ConfigOutput<C>[keyof C];
      return conf;
    }

    try {
      const [key, parse] = entry;
      const data = env[key];

      conf[name as keyof C] = parse(data) as ConfigOutput<C>[keyof C];
    } catch (error) {
      throw new EnviromentParseError(name, error);
    }
    return conf;
  }, {} as ConfigOutput<C>);
};
