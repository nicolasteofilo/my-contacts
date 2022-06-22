const ContactsRepository = require('../../../repositories/ContactsRepository')
const { AppError } = require('../../../../errors/AppError')

class UpdateContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute(id, {
    name, email, phone, category_id
  }) {
    const contactExists = await this.contactsRepository.findById(id);

    if (!contactExists) {
      throw new AppError('Contact not foud')
    }

    if (!name) {
      throw new AppError('Field name is required')
    }

    const contactByEmail = await this.contactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      throw new AppError('This e-mail is already in use')
    }

    const contact = await this.contactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return contact
  }
}

module.exports = UpdateContactUseCase;
