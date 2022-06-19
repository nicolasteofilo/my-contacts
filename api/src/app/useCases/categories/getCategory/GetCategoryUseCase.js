const CategoriesRepository = require('../../../repositories/CategoriesRepository');
const { AppError } = require('../../../../errors/AppError');

class GetCategoryUseCase {
  async execute(id) {
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      throw new AppError('Category not foud');
    }

    return category;
  }
}

module.exports = new GetCategoryUseCase();
