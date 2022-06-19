const ContactsRepository = require('../../../repositories/ContactsRepository')
const { AppError } = require('../../../../errors/AppError')

class UpdateContactUseCase {
  async execute(id, {
    name, email, phone, category_id
  }) {
    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      throw new AppError('Contact not foud')
    }

    if (!name) {
      throw new AppError('Field name is required')
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      throw new AppError('This e-mail is already in use')
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return contact
  }
}

module.exports = new UpdateContactUseCase()
