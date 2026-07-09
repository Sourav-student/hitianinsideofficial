import Redis from "ioredis";
import dotenv from 'dotenv'
dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

export const redis = new Redis(
  process.env.REDIS_URL,
  {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true
  }
);

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (error) => {
  console.error(
    "Redis connection error:",
    error
  );
});