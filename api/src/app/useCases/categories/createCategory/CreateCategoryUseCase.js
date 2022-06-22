const CategoriesRepository = require('../../../repositories/CategoriesRepository');
const { AppError } = require('../../../../errors/AppError');

class CreateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(name) {
    if (!name) {
      throw new AppError('Field name is required');
    }

    const category = await this.categoriesRepository.create({
      name,
    });
    return category;
  }
}

module.exports = CreateCategoryUseCase;
