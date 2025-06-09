import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./src/middleware/rateLimiter.js";
import transactionsRoute from "./src/routes/transactionsRoute.js";
import { initDB } from "./src/config/db.js";

dotenv.config();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});
