const ContactsRepository = require('../../../repositories/ContactsRepository');
const { AppError } = require('../../../../errors/AppError');

class GetContactUseCase {
  async execute({ id }) {
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      throw new AppError('Contact not foud');
    }
    return contact;
  }
}

module.exports = new GetContactUseCase();
