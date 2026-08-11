import { Request, Response } from "express";

export const getExpenses = (req: Request, res: Response) => {
  res.json([
    {
        id: 1,
        title: "ICA",
        amount: 100,
        date: "2023-06-01"
    },
    {
        id: 2,
        title: "SL",
        amount: 970,
        date: "2023-06-02"
    }
  ]);
}