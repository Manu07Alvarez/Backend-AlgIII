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

// src/types/DTOs/NotificacionesDTO.ts

export type PostNotificacionDTO = {
  id_usuario: number;
  type: "tema" | "post" | "mensaje";
  contenido: string;
  id_tema?: number;
  id_post?: number;
  id_mensaje?: number;
};

export type GetNotificacionDTO = {
  id: number;
  contenido: string;
  leido: boolean;
  id_usuario: number;
  id_tema?: number;
  id_post?: number;
  id_mensaje?: number;
  usuario: {
    id: number;
    nombre_apellido: string | null;
    email: string;
    rol: "ADMIN" | "MODERADOR" | "USUARIO" | null;
    activo: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
  tema?: {
    id: number;
    nombre: string;
    titulo: string;
  } | null;
  post?: {
    id: number;
    titulo: string;
  } | null;
  Mensaje?: {
    id: number;
    contenido: string;
  } | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
