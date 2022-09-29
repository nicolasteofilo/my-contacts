const { AppError } = require('../../../../errors/AppError');

class CreateContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute({
    name, email, phone, category_id,
  }) {
    if (!name) {
      throw new AppError('Name is required', 400);
    }

    const contactExists = await this.contactsRepository.findByEmail(email);
    if (contactExists) {
      throw new AppError('This e-mail is already in use', 400);
    }

    const contact = await this.contactsRepository.create({
      name, email, phone, category_id,
    });

    return contact;
  }
}

module.exports = CreateContactUseCase;
