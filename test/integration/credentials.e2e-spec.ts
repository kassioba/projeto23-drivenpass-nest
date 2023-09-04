import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from "../../src/db/prisma.service";
import { CredentialsModule } from '../../src/credentials/credentials.module';
import { PrismaModule } from '../../src/db/prisma.module';
import { CredentialsFactories } from '../factories/credentials.factories';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersFactories } from '../factories/user.factories';

describe('CredentialsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let credentialsFactories = new CredentialsFactories(prisma)
  let jwtService = new JwtService()
  let usersFactories: UsersFactories = new UsersFactories(prisma, jwtService)
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CredentialsModule, PrismaModule, 
        JwtModule.register({
        secret: process.env.JWT_SECRET
      })],
    })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
		await prisma.user.deleteMany();
    
    await app.init();
  });

  describe('POST /credentials', () => {
    it('should return status 401 when token is not valid', async () => {
      const response = await request(app.getHttpServer()).post('/credentials').set({ Authorization: 'token' }).send()

      expect(response.status).toBe(401)
    })

    it('should return status 400 when body is invalid', async () => {
      const token = await usersFactories.generateValidToken(process.env.JWT_SECRET)

      const response = await request(app.getHttpServer()).post('/credentials').set({ Authorization: `Bearer ${token}` }).send()

      expect(response.status).toBe(400)
    })
  })
});
