-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" SET DEFAULT true;

-- CreateTable
CREATE TABLE "notificacion" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "id_usuario" INTEGER NOT NULL,
    "id_tema" INTEGER,
    "id_post" INTEGER,
    "id_mensaje" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'MODERADOR', 'USUARIO');

-- ============================================
-- TABLAS PRINCIPALES
-- ============================================
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_apellido" TEXT,
    "email" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rol" "Rol" DEFAULT 'USUARIO',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "activa" BOOLEAN DEFAULT true,
    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Tema" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "titulo" TEXT NOT NULL,
    "id_creador" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "id_carrera" INTEGER NOT NULL,
    "fijado" BOOLEAN NOT NULL DEFAULT false,
    "cerrado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Tema_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true, -- ya unificado con el cambio de default
    "id_autor" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id_tema" INTEGER NOT NULL,
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Mensaje" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "id_autor" INTEGER NOT NULL,
    "id_post" INTEGER NOT NULL,
    "id_mensaje" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "Mensaje_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Reporte" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "resuelto" BOOLEAN DEFAULT false,
    "id_reportador" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "mensaje_id" INTEGER,
    "post_id" INTEGER,
    "tema_id" INTEGER,
    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id")
);

-- ============================================
-- TABLA NOTIFICACIÓN + RELACIÓN REPORTE-NOTIFICACIÓN
-- ============================================
CREATE TABLE "notificacion" (
    "id" SERIAL NOT NULL,
    "contenido" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "id_usuario" INTEGER NOT NULL,
    "id_tema" INTEGER,
    "id_post" INTEGER,
    "id_mensaje" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_ReporteTonotificacion" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ReporteTonotificacion_AB_pkey" PRIMARY KEY ("A","B")
);

-- ============================================
-- ÍNDICES
-- ============================================
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");
CREATE UNIQUE INDEX "Tema_nombre_key" ON "Tema"("nombre");
CREATE UNIQUE INDEX "Post_titulo_key" ON "Post"("titulo");

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

-- Relación muchos a muchos entre Reporte y Notificación
ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_A_fkey"
  FOREIGN KEY ("A") REFERENCES "Reporte"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_B_fkey"
  FOREIGN KEY ("B") REFERENCES "notificacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "_ReporteTonotificacion" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ReporteTonotificacion_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ReporteTonotificacion_B_index" ON "_ReporteTonotificacion"("B");

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "Tema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_id_mensaje_fkey" FOREIGN KEY ("id_mensaje") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_A_fkey" FOREIGN KEY ("A") REFERENCES "Reporte"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReporteTonotificacion" ADD CONSTRAINT "_ReporteTonotificacion_B_fkey" FOREIGN KEY ("B") REFERENCES "notificacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
