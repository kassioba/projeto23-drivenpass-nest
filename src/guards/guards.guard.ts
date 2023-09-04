import { CanActivate, ExecutionContext, Global, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService,
              private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest()
    const token = req.headers.authorization

    try {
      const data = this.usersService.checkToken(token?.split(' ')[1])
      const user = await this.usersRepository.selectUserByEmail(data.email)

      req.user = user
      
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
  }
}
