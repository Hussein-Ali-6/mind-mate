/*
  Warnings:

  - You are about to drop the column `option1` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `option2` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `Question` table. All the data in the column will be lost.
  - Added the required column `options` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` DROP COLUMN `option1`,
    DROP COLUMN `option2`,
    DROP COLUMN `option3`,
    ADD COLUMN `options` JSON NOT NULL,
    MODIFY `question` TEXT NOT NULL,
    MODIFY `answer` TEXT NOT NULL,
    MODIFY `source` TEXT NOT NULL;
