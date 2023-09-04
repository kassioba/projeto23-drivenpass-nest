-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" INTEGER NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,
    "cardType" "CardType" NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_title_key" ON "Card"("userId", "title");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
