import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { expenseSchema, updateExpenseSchema } from "../validators/expenseSchema.js";

// Get all expenses
export const getExpenses = async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany();

  res.json(expenses);
}

// Create a new expense
export const createExpense = async (req: Request, res: Response) => {
 const result = expenseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
        message: "Invalid expense data",
         error: result.error.issues 
    
        });
    }

    const { title, amount, date } = result.data;

  const expense = await prisma.expense.create({
    data: {
      title,
      amount,
      date: new Date(date),
    },
  });

  res.status(201).json(expense);
}

// Get an expense by ID
export const getExpenseById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const expense = await prisma.expense.findUnique({
    where: { id },
  });

  if (!expense) {
    return res.status(404).json({ error: "Expense not found" });
  }

  res.json(expense);
}

// Update an expense by ID
export const updateExpense = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const existingExpense = await prisma.expense.findUnique({
    where: { id }
  });

  if (!existingExpense) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  const result = updateExpenseSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid expense data",
      errors: result.error.issues
    });
  }

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      ...result.data,
      ...(result.data.date && {
        date: new Date(result.data.date)
      })
    }
  });

  res.json(expense);
};

export const deleteExpense = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const expense = await prisma.expense.findUnique({
    where: {
      id
    }
  });

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  await prisma.expense.delete({
    where: {
      id
    }
  });

  res.status(204).send();
};