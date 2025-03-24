const express = require("express");
const router = express.Router();
const {obtenerusuarios , registrarusurios} = require("../controllers/usuariosControllers");

// ruta para obtener usuarios
router.get("/", obtenerusuarios);

// ruta para registrar usuarios
router.post("/registrar", registrarusurios);

module.exports = router;