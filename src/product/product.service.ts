import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        categories: {
          connectOrCreate: createProductDto.categories.map((category) => {
            return {
              where: { name: category.name },
              create: { name: category.name },
            };
          }),
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        seller: {
          select: {
            id: true,
            email: true,
            name: true,
            lastName: true,
          },
        },
        categories: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
