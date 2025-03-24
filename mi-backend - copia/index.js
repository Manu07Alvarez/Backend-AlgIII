const express = require("express");
const app = express();


// middleware para procesar json
app.use(express.json());

//importar rutas
const usuariosRoutes = require("./routes/usuarios");

//usar rutas
app.use("/api/usuarios", usuariosRoutes);   

// ruta de prueba
app.get("/", (req,res) => {
    res.send("asdjasd");
});

// iniciar el servidor
app.listen(3000,() => {
    console.log('Servidor corriendo en http://localhost:3000');
});
 