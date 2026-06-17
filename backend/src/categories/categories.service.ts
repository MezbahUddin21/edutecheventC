import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll() {
    const cacheKey = 'categories:all';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const categories = await this.categoryRepo.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });

    await this.cacheManager.set(cacheKey, categories, 60 * 30); // 30 min cache
    return categories;
  }

  async seed() {
    const existing = await this.categoryRepo.count();
    if (existing > 0) return;

    const defaults = [
      { name: 'Music', icon: '🎵', color: '#7C3AED' },
      { name: 'Technology', icon: '💻', color: '#2563EB' },
      { name: 'Sports', icon: '⚽', color: '#16A34A' },
      { name: 'Arts & Culture', icon: '🎨', color: '#DC2626' },
      { name: 'Food & Drink', icon: '🍕', color: '#F59E0B' },
      { name: 'Business', icon: '💼', color: '#0891B2' },
      { name: 'Health & Wellness', icon: '🧘', color: '#059669' },
      { name: 'Education', icon: '📚', color: '#7C3AED' },
      { name: 'Networking', icon: '🤝', color: '#DB2777' },
      { name: 'Comedy', icon: '😂', color: '#EA580C' },
    ];

    const categories = defaults.map((d) => this.categoryRepo.create(d));
    await this.categoryRepo.save(categories);
    await this.cacheManager.del('categories:all');
  }
}
