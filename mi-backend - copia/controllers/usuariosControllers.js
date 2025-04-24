const bcrypt = require("bcryptjs");


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

};

const EliminarUsuario = (req, res) => {

};


module.exports = {
    RegistrarUsuarios,
    LoginUsuario,
    ObtenerUsuarios,
    ActualizarUsuario,
    EliminarUsuario
};
