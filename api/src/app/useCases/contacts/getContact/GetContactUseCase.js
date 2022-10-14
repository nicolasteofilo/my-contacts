const { AppError } = require("../../../../errors/AppError");
const isValidUUID = require("../../../utils/isValidUUID​");

class GetContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository;
  }

  async execute({ id }) {
    if (!isValidUUID(id)) {
      throw new AppError("Invalid contact", 400);
    }

    const contact = await this.contactsRepository.findById(id);

    if (!contact) {
      throw new AppError("Contact not foud", 404);
    }
    return contact;
  }
}

module.exports = GetContactUseCase;
