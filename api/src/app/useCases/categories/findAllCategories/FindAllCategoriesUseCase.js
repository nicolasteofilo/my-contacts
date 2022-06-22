const CategoriesRepository = require('../../../repositories/CategoriesRepository');

class FindAllCategoriesUseCase {
  async execute(orderBy) {
    const categories = await CategoriesRepository.findAll(orderBy);
    return categories;
  }
}

module.exports = new FindAllCategoriesUseCase();
