// Tipos de utilidad
export type DateTime = string | Date | null;

// -------------------------------
// DTOs relacionados
// -------------------------------

export type TemasNotificacionDTO = {
  id: number;
  nombre: string;
  titulo: string;
  id_creador: number;
  contenido: string;
  id_carrera: number;
  fijado: boolean;
  cerrado: boolean;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type PostsNotificacionDTO = {
  id: number;
  titulo: string;
  contenido: string;
  published: boolean;
  id_autor: number;
  id_tema: number;
};

export type MensajesNotificacionsDTO = {
  id: number;
  contenido: string;
  id_autor: number;
  id_post: number;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type UsuariosNotificacionDTO = {
  id: number;
  nombre_apellido: string | null;
  email: string;
  rol: string | null;
  activo: boolean | null;
};

// -------------------------------
// DTO principal de creación
// -------------------------------

export type PostNotificacionDTO = {
  contenido: string;
  id_usuario: number;
  type: "tema" | "post" | "mensaje";
};

// -------------------------------
// DTO de salida (GET)
// -------------------------------

export type GetNotificacionDTO = {
  id: number;
  contenido: string;
  leido: boolean;
  id_usuario: number;
  id_tema?: number | null;
  id_post?: number | null;
  id_mensaje?: number | null;
  createdAt?: DateTime;
  updatedAt?: DateTime;

  usuario?: UsuariosNotificacionDTO;
  tema?: TemasNotificacionDTO;
  post?: PostsNotificacionDTO;
  Mensaje?: MensajesNotificacionsDTO;
};
