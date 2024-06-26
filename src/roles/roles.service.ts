import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(createRoleDto: CreateRoleDto[]) {
    return await this.prisma.role.createMany({
      data: createRoleDto,
      skipDuplicates: true,
    });
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findOne(name: string) {
    return await this.prisma.role.findFirst({ where: { name } });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
