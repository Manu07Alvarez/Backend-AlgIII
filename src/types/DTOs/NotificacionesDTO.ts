// Tipos de utilidad
export type DateTime = string | Date | null;
import { GetUserForUserDTO as UsuarioDTO } from "../DTOs/UsuariosDTO.js"


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

// NotificacionesDTO.ts (ejemplo)
export type PostNotificacionDTO = {
  id: number;
  contenido: string;
  id_tema: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  titulo: string;
  published: boolean;
  id_autor: number;
};


// -------------------------------
// DTO de salida (GET)
// -------------------------------

export interface GetNotificacionDTO {
  id: number;
  contenido: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  usuario: UsuarioDTO;
  tema?: TemasNotificacionDTO | null;
  post?: PostNotificacionDTO | null;
  mensaje?: MensajesNotificacionsDTO | null;
}


