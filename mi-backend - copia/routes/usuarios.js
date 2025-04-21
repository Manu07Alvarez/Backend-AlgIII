const express = require("express");
const router = express.Router();
const { registrarUsuarios, loginUsuario, obtenerUsuarios} = require("../controllers/usuariosControllers");

//rutas
router.post("/registrar", registrarUsuarios);

router.post("/login", loginUsuario);

router.get("/usuarios", obtenerUsuarios);

module.exports = router;
