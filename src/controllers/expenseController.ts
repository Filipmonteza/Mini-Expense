import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const getExpenses = async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany();
  
  res.json(expenses);
}