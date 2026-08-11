import { Router } from "express";
import { getExpenses,createExpense, getExpenseById, updateExpense} from "../controllers/expenseController.js";

const router = Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.get("/:id", getExpenseById);
router.put("/:id", updateExpense);

export default router;