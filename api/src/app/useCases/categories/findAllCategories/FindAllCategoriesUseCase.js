class FindAllCategoriesUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(orderBy) {
    const categories = await this.categoriesRepository.findAll(orderBy);
    return categories;
  }
}

module.exports = FindAllCategoriesUseCase;
