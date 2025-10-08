type UsuariosDTO = {
    id: number
    email: string
    nombre_apellido: string
    rol: "USUARIO" | "ADMIN" | "MODERADOR"
    activo: boolean
}