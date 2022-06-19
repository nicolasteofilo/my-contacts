const ContactsRepository = require('../../../repositories/ContactsRepository');
const { AppError } = require('../../../../errors/AppError');

class CreateContactUseCase {
  async execute({
    name, email, phone, category_id,
  }) {
    if (!name) {
      throw new AppError('Field name is required');
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      throw new AppError('This e-mail is already in use');
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return contact;
  }
}

module.exports = new CreateContactUseCase();
