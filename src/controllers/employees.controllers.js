import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
    try {
        const employees = await pool.query('select * from employees');
        return res.json(employees[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

};

export const getOneEmployee = async (req, res) => {
    try {
        //const { id } = req.params;
        //const employee = await pool.query(`SELECT * FROM employees WHERE id = ${id}`);
        const employee = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        //console.log(employee);
        if (employee[0].length === 0) return res.status(404).send('Employee not found');
        return res.json(employee[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { name, salary } = req.body;
        //await pool.query(`INSERT INTO employees (name, salary) VALUES (\'${name}\', ${salary})`);
        await pool.query('insert into employees (name, salary) values (?, ?)', [name, salary]);
        //await pool.query('insert into employees (name, salary) values (\'juan\', 500)')
        return res.send('Created employee');
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;
        const [result] = await pool.query('UPDATE employees SET name = IFNULL (?, name), salary = IFNULL (?, salary) WHERE id = ?', [name, salary, id]);
        //console.log(result);
        if (result.changedRows === 0) return res.status(404).send('Unchange');
        return res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
        //console.log(result.affectedRows);
        if (result.affectedRows === 0) return res.status(404).send('Employee not found');
        return res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


