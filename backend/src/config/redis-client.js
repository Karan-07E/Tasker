// redisClient.js
import { createClient } from "redis";

export let redis = null;

if (process.env.REDIS_URL) {
  redis = createClient({
    url: process.env.REDIS_URL
  });

  redis.on("error", (err) => console.error("Redis Error", err));

  redis.connect().catch((err) => {
    console.error("Redis connection failed:", err);
    redis = null;
  });
}