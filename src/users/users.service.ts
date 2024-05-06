import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { comparePassword, encryptPassword } from 'src/auth/password.helper';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
interface FormatLogin extends Partial<User> {
  email: string;
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.validateUserExists(createUserDto.email);
    if (userExists)
      throw new HttpException('El correo ya se encuentra registrado', 409); // 409 Conflict

    const passwordEncrypted = await encryptPassword(createUserDto.password);
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

  //use by user module to change user password
  async updatePassword(payload: UpdatePasswordDto, id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await comparePassword(payload.old_password, user.password);
    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.prisma.user.update({
      where: { id },
      data: { password: await encryptPassword(payload.new_password) },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const passwordEncrypted = await encryptPassword(updateUserDto.password);
    const updateUserDtoEncrypted = {
      ...updateUserDto,
      password: passwordEncrypted,
    };
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDtoEncrypted,
    });
  }
  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePassword(password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...rest } = user;
    return rest;
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.prisma.user.findFirst({ where: { email } });
  }

  validateUserExists(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
