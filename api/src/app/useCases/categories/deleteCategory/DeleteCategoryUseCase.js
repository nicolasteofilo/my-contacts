const isValidUUID = require("../../../utils/isValidUUID​");

class DeleteCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute(id) {
    if(!isValidUUID(category_id)) {
      throw new AppError('Invalid category', 400);
    }

    await this.categoriesRepository.delete(id);
  }
}

module.exports = DeleteCategoryUseCase;
