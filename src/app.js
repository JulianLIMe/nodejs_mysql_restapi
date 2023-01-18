import express from "express";
import routerEmployees from "./routes/employees.routes.js";
import routerFirsTest from "./routes/firsTest.routes.js";

const app = express();

app.use(express.json());

app.use('/api', routerEmployees);
app.use(routerFirsTest);

//Manejo de rutas que no existen:
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' })
});

export default app