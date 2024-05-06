/*
  Warnings:

  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - Added the required column `option1` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option2` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option3` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` DROP COLUMN `options`,
    ADD COLUMN `option1` VARCHAR(191) NOT NULL,
    ADD COLUMN `option2` VARCHAR(191) NOT NULL,
    ADD COLUMN `option3` VARCHAR(191) NOT NULL,
    ADD COLUMN `source` VARCHAR(191) NOT NULL;
