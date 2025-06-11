import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDB } from "./config/db.js";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://expense-tracker-app-dd1250.expo.app", // Your new frontend URL
  // Add any other origins you need to allow, like your local dev environment
  "http://localhost:8081", // Default Expo Go local URL, adjust if different
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// middleware
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
