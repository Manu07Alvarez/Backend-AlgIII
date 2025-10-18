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

-- CreateTable
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
