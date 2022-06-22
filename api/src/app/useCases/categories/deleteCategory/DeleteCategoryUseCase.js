class DeleteCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(id) {
    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
