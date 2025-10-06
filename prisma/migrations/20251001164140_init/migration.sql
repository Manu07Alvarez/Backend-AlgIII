-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'MODERADOR', 'USUARIO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_apellido" TEXT,
    "email" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "rol" "Rol" DEFAULT 'USUARIO',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "activa" BOOLEAN DEFAULT true,

    CONSTRAINT "Carrera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateTable
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

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "id_autor" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "id_tema" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Tema_nombre_key" ON "Tema"("nombre");

-- CreateIndex
CREATE INDEX "idx_tema_nombre" ON "Tema"("nombre");

-- CreateIndex
CREATE INDEX "idx_tema_carrera" ON "Tema"("id_carrera");

-- CreateIndex
CREATE INDEX "idx_tema_creador" ON "Tema"("id_creador");

-- CreateIndex
CREATE UNIQUE INDEX "Post_titulo_key" ON "Post"("titulo");

-- CreateIndex
CREATE INDEX "idx_post_titulo" ON "Post"("titulo");

-- CreateIndex
CREATE INDEX "idx_post_tema" ON "Post"("id_tema");

-- CreateIndex
CREATE INDEX "idx_post_autor" ON "Post"("id_autor");

-- AddForeignKey
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_id_carrera_fkey" FOREIGN KEY ("id_carrera") REFERENCES "Carrera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_reportador_fkey" FOREIGN KEY ("id_reportador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_mensaje_id_fkey" FOREIGN KEY ("mensaje_id") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_tema_id_fkey" FOREIGN KEY ("tema_id") REFERENCES "Tema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_tema_fkey" FOREIGN KEY ("id_tema") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensaje" ADD CONSTRAINT "Mensaje_id_mensaje_fkey" FOREIGN KEY ("id_mensaje") REFERENCES "Mensaje"("id") ON DELETE SET NULL ON UPDATE CASCADE;
