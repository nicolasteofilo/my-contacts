const CategoriesRepository = require('../../../repositories/CategoriesRepository');

class DeleteCategoryUseCase {
  async execute(id) {
    await CategoriesRepository.delete(id);
  }
}

module.exports = new DeleteCategoryUseCase();
