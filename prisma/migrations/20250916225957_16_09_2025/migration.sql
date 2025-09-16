/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Tema` MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Reporte` (
    `id` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `resuelto` BOOLEAN NULL DEFAULT false,
    `id_reportador` INTEGER NOT NULL,
    `usuario_id` INTEGER NULL,
    `mensaje_id` INTEGER NULL,
    `post_id` INTEGER NULL,
    `tema_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Post_titulo_key` ON `Post`(`titulo`);

-- CreateIndex
CREATE INDEX `idx_post_titulo` ON `Post`(`titulo`);

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_id_reportador_fkey` FOREIGN KEY (`id_reportador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_mensaje_id_fkey` FOREIGN KEY (`mensaje_id`) REFERENCES `Mensaje`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_tema_id_fkey` FOREIGN KEY (`tema_id`) REFERENCES `Tema`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
