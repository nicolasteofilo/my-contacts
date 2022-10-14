const { AppError } = require("../../../../errors/AppError");
const isValidUUID = require("../../../utils/isValidUUID​");

class UpdateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({ id, name }) {
    if (!name) {
      throw new AppError("Field name is required");
    }
    if (!isValidUUID(id)) {
      throw new AppError("Invalid category", 400);
    }

    const categoryExists = await this.categoriesRepository.findById(id);
    if (!categoryExists) {
      throw new AppError("Category not foud", 404);
    }

    const category = await this.categoriesRepository.update(id, {
      name,
    });

    return category;
  }
}

module.exports = UpdateCategoryUseCase;
