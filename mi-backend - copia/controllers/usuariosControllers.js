const bcrypt  = require("bcryptjs");

// Registrar usuario (temporal, sin base de datos)
async function registrarUsuarios(req, res) {
    const { nombre, contraseña, correo } = req.body;

    if (!nombre || !contraseña || !correo) {
        return res.status(400).json({ mensaje: "Nombre, Correo y contraseña son requeridos" });
    }

    // Verificar si el usuario ya existe
    db.query ("SELECT * FROM usuarios WHERE nombre = ?", [nombre], (err, results) => {
        if (err) return res.status(500).json({ mensaje: "Errar al "})
    })

    // Cifrar la contraseña
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 8);
        const nuevoUsuario = { id: usuarios.length + 1, nombre, correo, contraseña: hashedPassword };
        usuarios.push(nuevoUsuario);

        res.json({ mensaje: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
}

// Login de usuario
const loginUsuario = (req, res) => {
    const { nombre, contraseña } = req.body;
    const usuario = usuarios.find(u => u.nombre === nombre);

    if (!usuario) {
        return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    console.log("Contraseña ingresada:", contraseña);
    console.log("Contraseña en BD:", usuario.contraseña);

    bcrypt.compare(contraseña, usuario.contraseña, (err, isMatch) => {
        if (err) return res.status(500).json({ mensaje: "Error al verificar la contraseña" });
        if (!isMatch) return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    });
};


// Obtener lista de usuarios
const obtenerUsuarios = (req, res) => {
    res.json(usuarios);
};

const recuperarUsuario = (req,res) => {
    const{nombre, correo} = req.body;

    const usuario = usuarios.find(u => u.nombre === nombre && u.correo === correo);

    if (!usuario){
        return res.status(404).json({mensaje: "usuario o correo incorrecto"});
    }

    res.json({mensaje: "se ha enviado un enlace de recuperacion en su correo electronico"});
};

module.exports = { 
    obtenerUsuarios,
    registrarUsuarios,
    loginUsuario,
    recuperarUsuario
  };
