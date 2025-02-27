import Redis from "ioredis";
import { env } from "@common/env";

export const connection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
};

export const redis = new Redis(connection);
