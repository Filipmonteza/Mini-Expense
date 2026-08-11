import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
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
});

export default router;