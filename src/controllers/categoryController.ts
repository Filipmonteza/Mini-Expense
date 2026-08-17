import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  res.json(categories);
};

// Create a category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await prisma.category.create({
    data: {
      name
    }
  });

  res.status(201).json(category);
};