const { AppError } = require('../../../../errors/AppError');

class GetCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(id) {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new AppError('Category not foud');
    }

    return category;
  }
}

module.exports = GetCategoryUseCase;
