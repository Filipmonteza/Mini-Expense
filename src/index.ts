import express from "express";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

const PORT = 8080;

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Mini Expense API Is Running!"
  });
});

// Alla requests till /expenses skickas till expenseRoutes
app.use("/expenses", expenseRoutes);

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});