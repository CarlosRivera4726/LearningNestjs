import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
