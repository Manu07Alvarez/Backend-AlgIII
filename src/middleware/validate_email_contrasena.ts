const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

export const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const validateContrasena = (contrasena: string): boolean => {
    return contrasenaRegex.test(contrasena);
};
