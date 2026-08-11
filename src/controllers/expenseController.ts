import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// Get all expenses
export const getExpenses = async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany();

  res.json(expenses);
}

// Create a new expense
export const createExpense = async (req: Request, res: Response) => {
  const { title, amount, date } = req.body;

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
    const { title, amount, date } = req.body;

    const expense = await prisma.expense.update({
        where: { id },
        data: {
            title,
            amount,
            date: new Date(date),
        },
    });

    res.json(expense);
}

export const deleteExpense = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await prisma.expense.delete({
        where: { id },
    });

    res.status(204).end();
}