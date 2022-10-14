const isValidUUID = require("../../../utils/isValidUUID​");

class DeleteContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute(id) {
    if(!isValidUUID(id)) {
      throw new AppError('Invalid contact', 400);
    }
    await this.contactsRepository.delete(id);
  }
}

module.exports = DeleteContactUseCase;
