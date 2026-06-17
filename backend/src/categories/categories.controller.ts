import { Controller, Get, Post, OnModuleInit } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController implements OnModuleInit {
  constructor(private readonly categoriesService: CategoriesService) {}

  async onModuleInit() {
    await this.categoriesService.seed();
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}
