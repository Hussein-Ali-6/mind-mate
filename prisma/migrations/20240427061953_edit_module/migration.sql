/*
  Warnings:

  - You are about to drop the column `Title` on the `Module` table. All the data in the column will be lost.
  - Added the required column `title` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Module`
    ADD COLUMN `content` JSON NULL,
    RENAME COLUMN `Title` to `title`;
