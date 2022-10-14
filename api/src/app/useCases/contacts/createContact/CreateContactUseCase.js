const { AppError } = require("../../../../errors/AppError");
const isValidUUID = require("../../../utils/isValidUUID​");

class CreateContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository;
  }

  async execute({ name, email, phone, category_id }) {
    if (!name) {
      throw new AppError("Name is required", 400);
    }

    if (category_id && !isValidUUID(category_id)) {
      throw new AppError("Invalid category", 400);
    }

    if(email) {
      const contactExists = await this.contactsRepository.findByEmail(email);
      if (contactExists) {
        throw new AppError("This e-mail is already in use", 400);
      }
    }

    const contact = await this.contactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return contact;
  }
}

module.exports = CreateContactUseCase;
