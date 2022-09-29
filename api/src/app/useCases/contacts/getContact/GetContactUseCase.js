const { AppError } = require('../../../../errors/AppError');
class GetContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute({ id }) {
    const contact = await this.contactsRepository.findById(id);
    if (!contact) {
      throw new AppError('Contact not foud', 404);
    }
    return contact;
  }
}

module.exports = GetContactUseCase;
