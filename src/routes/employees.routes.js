import { Router } from "express";
import { getEmployees, createEmployee, getOneEmployee, deleteEmployee, updateEmployee } from "../controllers/employees.controllers.js";

const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', getOneEmployee);

router.post('/employees', createEmployee);

router.put('/employees/:id', updateEmployee);

router.delete('/employees/:id', deleteEmployee);

export default router;

