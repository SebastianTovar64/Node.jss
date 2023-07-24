const express = require("express");
const app = express();
const port = process.env.port || 3030;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const clientes = [
    { id: 1, nombre : "Juan", apellido:"Lopez", constructora: "Constructora A", valorNeto: 100000, valorFinal: 120000 },
    { id: 2, nombre : "Andrea", apellido:"Perez", constructora: "Constructora B", valorNeto: 150000, valorFinal: 180000 },
    { id: 3, nombre : "Sebastian", apellido:"Ramirez", constructora: "Constructora C", valorNeto: 200000, valorFinal: 240000 },
];

app.get("/", (req, res) => {
    res.send("Hola, esta es la API de la constructora");
});

app.get("/api/clientes", (req, res) => {
    res.send(clientes);
});

app.get("/api/clientes/:id", (req, res) => {
    const cliente = clientes.find((c) => c.id === parseInt(req.params.id));
    if (!cliente)
        return res
            .status(404)
            .send("Cliente no encontrado en nuestra base de datos");
    else res.send(cliente);
});

// Crear cliente
app.post("/api/clientes", (req, res) => {
    const cliente = {
        id: clientes.length + 1,
        constructora: req.body.constructora,
        valorNeto: parseInt(req.body.valorNeto),
        valorFinal: parseInt(req.body.valorFinal),
    };

    clientes.push(cliente);
    res.send(cliente);
});

// Actualizar cliente
app.put("/api/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex((c) => c.id === id);

    if (clienteIndex !== -1) {
        const updateCliente = {
            id: id,
            constructora: req.body.constructora,
            valorNeto: parseInt(req.body.valorNeto),
            valorFinal: parseInt(req.body.valorFinal),
        };
        clientes[clienteIndex] = updateCliente;
        res.send(updateCliente);
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});

// Eliminar cliente
app.delete("/api/clientes/:id", (req, res) => {
    const cliente = clientes.find((c) => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send("Cliente no encontrado");

    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);
    res.send(cliente);
});

app.listen(port, () => console.log("Escuchando el puerto:", port));
