/*
  Warnings:

  - You are about to drop the column `orderId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `user` table. All the data in the column will be lost.
  - Added the required column `price` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_sellerId_fkey`;

-- AlterTable
ALTER TABLE `order` ALTER COLUMN `totalPrice` DROP DEFAULT;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `orderId`;

-- AlterTable
ALTER TABLE `productorder` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `seller`,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'SELLER', 'CUSTOMER') NOT NULL DEFAULT 'USER',
    MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
