const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [{
  id: v4(),
  name: 'Nicolas',
  email: 'nicolas@mail.com',
  phone: '(12) 91234-1234',
  category_id: v4(),
}, {
  id: v4(),
  name: 'Jose',
  email: 'jose@mail.com',
  phone: '(12) 91234-1234',
  category_id: v4(),
}];

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECt * FROM contacts ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);
    /*
      SQL Bind Variables - os binds são os valores colocados no simbolo de
      dólar de maneira sequencial, o array inserido é referente aos valores
      colocados nas várias de binds, sãoem ordem sequencial
    */
    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactsRepository();
