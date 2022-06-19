const ContactsRepository = require('../../../repositories/ContactsRepository');
const { AppError } = require('../../../../errors/AppError');

class FindAllContacts {
  async execute({ orderBy }) {
    const contacts = await ContactsRepository.findAll(orderBy);
    return contacts
  }
}

module.exports = new FindAllContacts()
