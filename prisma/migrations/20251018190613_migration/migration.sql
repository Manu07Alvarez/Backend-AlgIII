-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'MODERADOR', 'USUARIO');

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================

CREATE TABLE "Usuario" (
    "id" SERIAL PRIMARY KEY,
    "nombre_apellido" TEXT NOT NULL,
    "alias" TEXT,
    "alumno_iseta" BOOLEAN DEFAULT false,
    "carrera_iseta" VARCHAR(30),
    "email" TEXT NOT NULL UNIQUE,
    "contrasenia" TEXT NOT NULL,
    "activo" BOOLEAN DEFAULT true,
    "rol" "Rol" DEFAULT 'USUARIO',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

CREATE TABLE "Carrera" (
    "id" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL UNIQUE,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "activa" BOOLEAN DEFAULT true
);

CREATE TABLE "Tema" (
    "id" SERIAL PRIMARY KEY,
    "nombre" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "titulo" TEXT NOT NULL,
    "id_creador" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "id_carrera" INTEGER NOT NULL,
    "fijado" BOOLEAN DEFAULT false,
    "cerrado" BOOLEAN DEFAULT false
);

CREATE TABLE "Post" (
    "id" SERIAL PRIMARY KEY,
    "titulo" TEXT NOT NULL UNIQUE,
    "contenido" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT true,
    "id_autor" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id_tema" INTEGER NOT NULL
);

CREATE TABLE "Mensaje" (
    "id" SERIAL PRIMARY KEY,
    "contenido" TEXT NOT NULL,
    "id_autor" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "id_mensaje" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

CREATE TABLE "Reporte" (
    "id" TEXT PRIMARY KEY,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "resuelto" BOOLEAN DEFAULT false,
    "id_reportador" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "mensaje_id" INTEGER,
    "post_id" INTEGER,
    "tema_id" INTEGER
);

CREATE TABLE "notificacion" (
    "id" SERIAL PRIMARY KEY,
    "contenido" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "leido" BOOLEAN DEFAULT false,
    "id_usuario" INTEGER NOT NULL,
    "id_tema" INTEGER,
    "id_post" INTEGER,
    "id_mensaje" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- Prisma crea automáticamente esta tabla intermedia para la relación muchos-a-muchos
CREATE TABLE "_ReporteTonotificacion" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ReporteTonotificacion_AB_unique" UNIQUE ("A","B")
);

-- ============================================
-- ÍNDICES
-- ============================================
CREATE INDEX "idx_tema_nombre" ON "Tema"("nombre");
CREATE INDEX "idx_tema_carrera" ON "Tema"("id_carrera");
CREATE INDEX "idx_tema_creador" ON "Tema"("id_creador");

CREATE INDEX "idx_post_titulo" ON "Post"("titulo");
CREATE INDEX "idx_post_tema" ON "Post"("id_tema");
CREATE INDEX "idx_post_autor" ON "Post"("id_autor");

CREATE INDEX "_ReporteTonotificacion_B_index" ON "_ReporteTonotificacion"("B");

-- ============================================
-- CLAVES FORÁNEAS
-- ============================================

-- Tema
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_id_creador_fkey"
  FOREIGN KEY ("id_creador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Tema" ADD CONSTRAINT "Tema_id_carrera_fkey"
  FOREIGN KEY ("id_carrera") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Post
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_autor_fkey"
  FOREIGN KEY ("id_autor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post" ADD CONSTRAINT "Post_id_tema_fkey"
  FOREIGN KEY ("id_tema") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Mensaje
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_autor_fkey"
  FOREIGN KEY ("id_autor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_post_fkey"
  FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_mensaje_fkey"
  FOREIGN KEY ("id_mensaje") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Reporte
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_reportador_fkey"
  FOREIGN KEY ("id_reportador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_usuario_id_fkey"
  FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_mensaje_id_fkey"
  FOREIGN KEY ("mensaje_id") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_post_id_fkey"
  FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_tema_id_fkey"
  FOREIGN KEY ("tema_id") REFERENCES "Tema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Notificación
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_usuario_fkey"
  FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_tema_fkey"
  FOREIGN KEY ("id_tema") REFERENCES "Tema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_post_fkey"
  FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_mensaje_fkey"
  FOREIGN KEY ("id_mensaje") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Relación muchos-a-muchos Reporte <-> Notificación
ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_A_fkey"
  FOREIGN KEY ("A") REFERENCES "Reporte"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_B_fkey"
  FOREIGN KEY ("B") REFERENCES "notificacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
