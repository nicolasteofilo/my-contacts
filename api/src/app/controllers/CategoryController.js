const CreateCategoryUseCase = require('../useCases/categories/createCategory/CreateCategoryUseCase');
const GetCategoryUseCase = require('../useCases/categories/getCategory/GetCategoryUseCase');
const UpdateCategoryUseCase = require('../useCases/categories/updateCategory/UpdateCategoryUseCase');
const DeleteCategoryUseCase = require('../useCases/categories/deleteCategory/DeleteCategoryUseCase');
const FindAllCategoriesUseCase = require('../useCases/categories/findAllCategories/FindAllCategoriesUseCase');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await FindAllCategoriesUseCase.execute(orderBy);
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    const category = await CreateCategoryUseCase.execute(name);
    response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await GetCategoryUseCase.execute(id);
    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const category = await UpdateCategoryUseCase.execute({
      id,
      name,
    });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await DeleteCategoryUseCase.execute(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
