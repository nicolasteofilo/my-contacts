const CategoriesRepository = require('../../../repositories/CategoriesRepository');
const { AppError } = require('../../../../errors/AppError');

class CreateCategoryUseCase {
  async execute(name) {
    if (!name) {
      throw new AppError('Field name is required');
    }

    const category = await CategoriesRepository.create({
      name,
    });
    return category;
  }
}

module.exports = new CreateCategoryUseCase();
