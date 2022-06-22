class DeleteContactUseCase {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute(id) {
    await this.contactsRepository.delete(id);
  }
}

module.exports = DeleteContactUseCase;
