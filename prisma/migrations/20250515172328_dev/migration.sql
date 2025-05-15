/*
  Warnings:

  - You are about to drop the column `description` on the `Sprint` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `Sprint` table. All the data in the column will be lost.
  - You are about to drop the column `img_url` on the `User` table. All the data in the column will be lost.
  - Added the required column `descriptionPath` to the `Sprint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sprint" DROP COLUMN "description",
DROP COLUMN "img_url",
ADD COLUMN     "descriptionPath" TEXT NOT NULL,
ADD COLUMN     "imgPath" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "img_url",
ADD COLUMN     "imgPath" TEXT;
