const CategoriesRepository = require('../../../repositories/CategoriesRepository');
const { AppError } = require('../../../../errors/AppError');

class UpdateCategoryUseCase {
  async execute({ id, name }) {
    if (!name) {
      throw new AppError('Field name is required');
    }

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      throw new AppError('Category not foud', 404);
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    return category;
  }
}

module.exports = new UpdateCategoryUseCase();
