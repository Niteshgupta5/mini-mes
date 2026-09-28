import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './domain';
import { Roles } from '../../guards';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  async getUsers() {
    return await this.service.findAll();
  }
}
