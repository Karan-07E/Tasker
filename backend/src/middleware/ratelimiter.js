// rateLimiter.js
import { redis } from "../config/redis-client.js";

export const rateLimit = async (req, res, next) => {
  try {
    if (!redis || !redis.isReady) {
      return next();
    }

    const ip = req.ip;
    const key = `rate:${ip}`;

    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, 10); // 10 sec window
    }

    if (current > 10) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (err) {
    console.error("Rate limiter failed:", err);
    next(); // fail-open (important)
  }
};

export default rateLimit;