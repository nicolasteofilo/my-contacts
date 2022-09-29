const ContactsRepository = require('../repositories/ContactsRepository')

const FindAllContactsUseCase = require('../useCases/contacts/findAllContacts/FindAllContacts');
const GetContactUseCase = require('../useCases/contacts/getContact/GetContactUseCase');
const CreateContactUseCase = require('../useCases/contacts/createContact/CreateContactUseCase');
const UpdateContactUseCase = require('../useCases/contacts/updateContact/UpdateContactUseCase');
const DeleteContactUseCase = require('../useCases/contacts/deleteContact/DeleteContactUseCase');

const findAllContactsUseCase = new FindAllContactsUseCase(ContactsRepository)
const getContactUseCase = new GetContactUseCase(ContactsRepository)
const createContactUseCase = new CreateContactUseCase(ContactsRepository)
const updateContactUseCase = new UpdateContactUseCase(ContactsRepository)
const deleteContactUseCase = new DeleteContactUseCase(ContactsRepository)

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await findAllContactsUseCase.execute(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await getContactUseCase.execute({ id });
    response.status(200).json(contact);
  }

  async store(request, response) {
    const body = request.body;
    const contact = await createContactUseCase.execute(body);
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;
    const contact = await updateContactUseCase.execute(id, {
      name, category_id, email, phone
    })
    response.status(200).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await deleteContactUseCase.execute(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
