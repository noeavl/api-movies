/*
  Warnings:

  - Added the required column `releaseYear` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `directors` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `movies` ADD COLUMN `posterUrl` VARCHAR(191) NULL,
    ADD COLUMN `rating` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `releaseYear` INTEGER NOT NULL,
    MODIFY `duration` INTEGER NULL;

-- CreateIndex
CREATE INDEX `movies_releaseYear_idx` ON `movies`(`releaseYear`);
