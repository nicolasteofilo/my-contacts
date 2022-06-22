class FindAllContacts {
  constructor(contactsRepository) {
    this.contactsRepository = contactsRepository
  }

  async execute(orderBy) {
    const contacts = await this.contactsRepository.findAll(orderBy);
    return contacts
  }
}

module.exports = FindAllContacts
