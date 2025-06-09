import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({ error: "Too many requests" });
    }

    next();
  } catch (error) {
    console.error("Error applying rate limit:", error);
    next(error);
  }
};

export default rateLimiter;
