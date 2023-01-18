import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get('/firsTest', async (req, res) => {
    const result = await pool.query('select * from employees');
    res.json(result[0])
});

export default router;

