/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/


-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `Module` DROP FOREIGN KEY `Module_userId_fkey`;

ALTER TABLE `Module` RENAME TO `Course`;

-- AlterTable
ALTER TABLE `Chapter` RENAME COLUMN `moduleId` TO `courseId`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

