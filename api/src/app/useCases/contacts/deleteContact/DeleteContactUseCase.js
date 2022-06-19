const ContactsRepository = require('../../../repositories/ContactsRepository')

class DeleteContactUseCase {
  async execute(id) {
    await ContactsRepository.delete(id);
  }
}

module.exports = new DeleteContactUseCase()
