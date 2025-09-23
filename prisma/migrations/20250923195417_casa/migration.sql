-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_apellido` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `rol` ENUM('ADMIN', 'MODERADOR', 'USUARIO') NULL DEFAULT 'USUARIO',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrera` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `activa` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `Carrera_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `id_creador` INTEGER NOT NULL,
    `contenido` TEXT NOT NULL,
    `id_carrera` INTEGER NOT NULL,
    `fijado` BOOLEAN NOT NULL DEFAULT false,
    `cerrado` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Tema_nombre_key`(`nombre`),
    INDEX `idx_tema_nombre`(`nombre`),
    INDEX `idx_tema_carrera`(`id_carrera`),
    INDEX `idx_tema_creador`(`id_creador`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `contenido` TEXT NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `id_autor` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `id_tema` INTEGER NOT NULL,

    UNIQUE INDEX `Post_titulo_key`(`titulo`),
    INDEX `idx_post_titulo`(`titulo`),
    INDEX `idx_post_tema`(`id_tema`),
    INDEX `idx_post_autor`(`id_autor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenido` TEXT NOT NULL,
    `id_autor` INTEGER NOT NULL,
    `id_post` INTEGER NOT NULL,
    `id_mensaje` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tema` ADD CONSTRAINT `Tema_id_creador_fkey` FOREIGN KEY (`id_creador`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tema` ADD CONSTRAINT `Tema_id_carrera_fkey` FOREIGN KEY (`id_carrera`) REFERENCES `Carrera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_autor_fkey` FOREIGN KEY (`id_autor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_tema_fkey` FOREIGN KEY (`id_tema`) REFERENCES `Tema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_id_autor_fkey` FOREIGN KEY (`id_autor`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensaje` ADD CONSTRAINT `Mensaje_id_mensaje_fkey` FOREIGN KEY (`id_mensaje`) REFERENCES `Mensaje`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
