const { uuid } = require('uuidv4');

const contacts = [{
  id: uuid(),
  name: 'Nicolas',
  phone: '(12) 91234-1234',
  category_id: uuid(),
}];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
