const express = require ("express");
const router = express.Router();

const {RegistrarUsuarios, LoginUsuario, ObtenerUsuarios, ActualizarUsuario, EliminarUsuario} = require("../controllers/usuariosControllers");

// rutas para registrar, iniciar, obtener, actualiazar y eliminar usuarios

router.post("/Registrar", RegistrarUsuarios);

router.post("/Login", LoginUsuario);

router.get("/Obtener", ObtenerUsuarios);

router.put("/Actualizar/:id", ActualizarUsuario);

router.delete("/Eliminar/:id", EliminarUsuario);

module.exports = router;
