const ContactsRepository = require('../repositories/ContactsRepository');
const errors = require('../../errors');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({
        error: errors.Contacts.notFound,
      });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({
        error: errors.Filds.nameIsRequired,
      });
    }

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists) {
      return response.status(400).json({
        error: errors.Contacts.emailInUse,
      });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).send({ error: errors.Contacts.notFound });
    }

    if (!name) {
      return response.status(400).json({
        error: errors.Filds.nameIsRequired,
      });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: errors.Contacts.emailInUse });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.status(200).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
