const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function RegistrarUsuarios (req,res) {
    const { usuario, Alias, Contrasena, Correo} = req.body;
    if (!usuario || !Alias || !Contrasena || !Correo) {
        return res.status(400).json({error: "usuario ya regisrado"});   
    }
    
    try {
        const hashed = await bcrypt.hash(Contrasena, 10);
        const nuevoUsuario = {id: usuario.length + 1, usuario, Alias, contrasena: hashed, Correo};
        usuarios.push(nuevoUsuario);

        res.status(201).json({mensaje: "usuario registrado", usuario: nuevoUsuario});
    } catch (error){
        res.status(500).json({error: "Error al registrar el usuario"});
    }
};

const LoginUsuario = (req, res) => {
    const { usuario, contrasena} = req.body;
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);
    if (usuarioEncontrado) return res.status(400).json({error: "usuario no encontrado"});

    const contrasenavalida = bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if (!contrasenavalida) return res.status(400).json({error: "contraseña incorrecta"});

    const token = jwt.sign({ id: usuarioEncontrado.id}, contrasena, {expiresIn: "1h"})
    res.status(200).json({mensaje: "usuario logueado", usuario: usuarioEncontrado});
    };

const ObtenerUsuarios = (req, res) =>{
    res.json(usuarios);
};

const ActualizarUsuario = (req, res) => {
    const {usuario, contrasena, Alias} = req.body;
    const usuarioid = usuario.find(u => u.id === req.params.id);
    if (!usuarioid) return res.status(404).json({error: "usuario no encontrado"});

    if (!usuario) usuarioid.usuario = usuario;
    if (!contrasena) usuarioid.contrasena = contrasena;
    if (!Alias) usuarioid.Alias = Alias,
    res.json({mensaje: "usuario actualizado", usuario: usuarioid});
};

const EliminarUsuario = (req, res) => {
    const {usuario} = req.body;
    const usuarioid = usuario.find(u => u.id === req.params.id);
    if (!usuarioid) return res.status(404).json({error: "usuario no encontrado"});

    usuario.splice(usuarioid, 1);
    res.json({mensaje: "usuario eliminado", usuario: usuarioid});
};


module.exports = {
    RegistrarUsuarios,
    LoginUsuario,
    ObtenerUsuarios,
    ActualizarUsuario,
    EliminarUsuario
};
