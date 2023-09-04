import { faker } from "@faker-js/faker";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../src/db/prisma.service";
import { UsersModule } from "../../src/users/users.module";
import * as request from 'supertest';
import { UsersFactories } from "../factories/user.factories";
import { PrismaModule } from "../../src/db/prisma.module";
import { JwtService } from "@nestjs/jwt";


describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService = new PrismaService();
    let jwtService = new JwtService()
    let usersFactories: UsersFactories = new UsersFactories(prisma, jwtService)
    
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [UsersModule, PrismaModule],
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

    describe('POST /users', () => {
        describe('/sign-up', () => {
            it('should respond with status 400 if body is empty', async () => {
                const response = await request(app.getHttpServer()).post('/users/sign-up').send()

                expect(response.status).toBe(400)
            })

            it('should respond with status 409 if email already exist', async () => {
                const email = faker.internet.email()
                
                await usersFactories.createUser(email, 'S3nh@F0rt3')
                
                const response = await request(app.getHttpServer()).post('/users/sign-up').send({
                    email,
                    password: 'S3nh@F0rt3Numero2'
                })

                expect(response.status).toBe(409)
            })

            it('should respond with status 400 if password is not strong enough', async () => {
                const response = await request(app.getHttpServer()).post('/users/sign-up').send({
                    email: faker.internet.email(),
                    password: 'senhafraca'
                })

                expect(response.status).toBe(400)
            })

            it('should respond with status 201', async () => {
                const response = await request(app.getHttpServer()).post('/users/sign-up').send({
                    email: faker.internet.email(),
                    password: 'S3nh@F0rt3'
                })

                expect(response.status).toBe(201)
            })
        })

        describe('/sign-in', () => {
            it('should responde with status 401 if email is wrong', async () => {
                const email = faker.internet.email()
                const password = 'S3nh@F0rt3'

                await usersFactories.createUser(email, password)

                const response = await request(app.getHttpServer()).post('/users/sign-in').send({
                    email: 'aa@aa.com',
                    password
                })

                expect(response.status).toBe(401)
            })

            it('should responde with status 401 if password is wrong', async () => {
                const email = faker.internet.email()
                const password = 'S3nh@F0rt3'

                await usersFactories.createUser(email, password)

                const response = await request(app.getHttpServer()).post('/users/sign-in').send({
                    email,
                    password: 'senha errada'
                })

                expect(response.status).toBe(401)
            })

            it('should responde with status 201 and token', async () => {
                const email = faker.internet.email()
                const password = 'S3nh@F0rt3'

                await usersFactories.createUser(email, password)

                const { body, status } = await request(app.getHttpServer()).post('/users/sign-in').send({
                    email,
                    password
                })

                expect(status).toBe(201)
                expect(body).toEqual({ token: expect.any(String) })
            })
        })
    })
  });