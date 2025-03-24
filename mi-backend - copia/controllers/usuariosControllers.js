const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// datos de usuarios  en memoria (sin base de datos)

let usuarios = [
    {id: 1, nombre: "admin" , contraseña:"$2a$10$WqU7Ff2FwUl7B0nI2dJveuvP5KtV6lsXj01lF.Su3v2rYPxyTe8e6"}
];

// obtener lista de usuarios (temporal)

const obtenerusuarios = (req, res) => {
    res.json(usuarios);
}

const registrarusurios = (req, res) => {
    const {nombre, contraseña } = req.body;
    
    if (!nombre || !contraseña) {
        return res.status(400).json({ mensaje: "Faltan datos"});
    }

    const nuevousuario = {
        id: usuarios.length + 1,
        nombre,
        contraseña
    };

    usuarios.push(nuevousuario);
    res.status(201).json({mensaje : "Usuario registrado", usuario: nuevousuario});
};

module.exports = { obtenerusuarios, registrarusurios};