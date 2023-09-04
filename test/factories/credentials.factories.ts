import { PrismaService } from "src/db/prisma.service";

export class CredentialsFactories{
    constructor(private readonly prisma: PrismaService) {}
}