const { AppError } = require('../../../../errors/AppError');

class CreateContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute({
    name, email, phone, category_id,
  }) {
    if (!name) {
      throw new AppError('Field name is required');
    }

    const contactExists = await this.contactsRepository.findByEmail(email);
    if (contactExists) {
      throw new AppError('This e-mail is already in use');
    }

    const contact = await this.contactsRepository.create({
      name, email, phone, category_id,
    });

    return contact;
  }
}

module.exports = CreateContactUseCase;
