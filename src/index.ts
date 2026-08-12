import express from "express";
import expenseRoutes from "./routes/expenseRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 8080;

// Middleware för att parsa JSON i request body
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Mini Expense API Is Running!"
  });
});

// Alla requests till /expenses skickas till expenseRoutes
app.use("/expenses", expenseRoutes);

// Central error handler
app.use(errorHandler);

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});