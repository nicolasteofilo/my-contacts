const CategoriesRepository = require('../repositories/CategoriesRepository')

const CreateCategoryUseCase = require('../useCases/categories/createCategory/CreateCategoryUseCase');
const GetCategoryUseCase = require('../useCases/categories/getCategory/GetCategoryUseCase');
const UpdateCategoryUseCase = require('../useCases/categories/updateCategory/UpdateCategoryUseCase');
const DeleteCategoryUseCase = require('../useCases/categories/deleteCategory/DeleteCategoryUseCase');
const FindAllCategoriesUseCase = require('../useCases/categories/findAllCategories/FindAllCategoriesUseCase');

const findAllCategoriesUseCase = new FindAllCategoriesUseCase(CategoriesRepository)
const createCategoryUseCase = new CreateCategoryUseCase(CategoriesRepository)
const deleteCategoryUseCase = new DeleteCategoryUseCase(CategoriesRepository)
const getCategoryUseCase = new GetCategoryUseCase(CategoriesRepository)
const updateCategoryUseCase = new UpdateCategoryUseCase(CategoriesRepository)
class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await findAllCategoriesUseCase.execute(orderBy);
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    const category = await createCategoryUseCase.execute(name);
    response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await getCategoryUseCase.execute(id);
    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;
    const category = await updateCategoryUseCase.execute({
      id,
      name,
    });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await deleteCategoryUseCase.execute(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
