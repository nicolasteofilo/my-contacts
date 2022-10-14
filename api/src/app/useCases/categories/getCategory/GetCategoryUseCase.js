const { AppError } = require('../../../../errors/AppError');
const isValidUUID = require('../../../utils/isValidUUID​');

class GetCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(id) {
    if(!isValidUUID(id)) {
      throw new AppError('Invalid category', 400);
    }

    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new AppError('Category not foud');
    }

    return category;
  }
}

module.exports = GetCategoryUseCase;
