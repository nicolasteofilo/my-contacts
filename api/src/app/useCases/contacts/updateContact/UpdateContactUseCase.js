const { AppError } = require("../../../../errors/AppError");
const isValidUUID = require("../../../utils/isValidUUID​");

class UpdateContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository;
  }

  async execute(id, { name, email, phone, category_id }) {
    if (!name) {
      throw new AppError("Field name is required");
    }

    if (!isValidUUID(id)) {
      throw new AppError("Invalid contact", 400);
    }

    if (category_id && !isValidUUID(category_id)) {
      throw new AppError("Invalid category", 400);
    }

    const contactExists = await this.contactsRepository.findById(id);
    if (!contactExists) {
      throw new AppError("Contact not foud");
    }

    if(email) {
      const contactByEmail = await this.contactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        throw new AppError("This e-mail is already in use");
      }
    }

    const contact = await this.contactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    return contact;
  }
}

module.exports = UpdateContactUseCase;
