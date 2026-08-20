import { Category } from 'src/modules/categories/entities/category.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import categories from './category.data';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Category);

    const seedCategories = async (
      categoryList: typeof categories,
      parentId?: string,
    ): Promise<void> => {
      for (const categoryData of categoryList) {
        const slug = this.createSlug(categoryData.name);
        let category = await repository.findOne({
          where: { slug },
        });
        if (!category) {
          category = repository.create({
            name: categoryData.name,
            slug,
            description: categoryData.description,
            parentId,
            isActive: true,
          });
          category = await repository.save(category);
        }
        if (categoryData.subcategories?.length) {
          await seedCategories(
            categoryData.subcategories as typeof categories,
            category.id,
          );
        }
      }
    };

    await seedCategories(categories);
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
