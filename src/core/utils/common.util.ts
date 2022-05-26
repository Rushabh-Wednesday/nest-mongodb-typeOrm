import * as dotenv from 'dotenv';
import * as path from 'path';

export const getEnv = (key: string) => {
  const envConfig = dotenv.config({
    path: path.join(process.cwd(), '/', `.env.${process.env.ENVIRONMENT}`),
  });
  return envConfig.parsed[key] || process.env[key];
};
