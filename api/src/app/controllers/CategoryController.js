const CategoriesRepository = require('../repositories/CategoriesRepository');
const errors = require('../errors');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({
        error: errors.Filds.nameIsRequired,
      });
    }

    const category = await CategoriesRepository.create({
      name,
    });
    response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({
        error: errors.Categories.notFoud,
      });
    }

    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      response.status(400).json({
        error: errors.Filds.nameIsRequired,
      });
    }

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      response.status(404).json({
        error: errors.Categories.notFoud,
      });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    response.json(category);
  }
}

module.exports = new CategoryController();
