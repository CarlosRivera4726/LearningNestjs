import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.validateUserExists(createUserDto.email);
    if (userExists)
      throw new HttpException('El correo ya se encuentra registrado', 409); // 409 Conflict

    const passwordEncrypted = this.encryptPassword(createUserDto.password);
    const createUserDtoEncrypted = {
      ...createUserDto,
      password: passwordEncrypted,
    };
    return await this.prisma.user.create({ data: createUserDtoEncrypted });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
    });
  }
  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10).toString();
  }

  validateUserExists(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
