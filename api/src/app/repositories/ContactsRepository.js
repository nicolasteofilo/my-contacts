/* eslint-disable max-len */
const db = require('../../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT contacts.*, categories.name as category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
      `);

    /*
      Sem especificar - vai usar o INNER JOIN
      obs: a tabela da esquerda é que está no FROM e as da direita são as que estão no JOIN
      INNER JOIN - apenas do  registros da tabela da esquerda que possui relacionamento com a tabela da direita, então vai retornar os registros que estão na inerseção
      LEFT JOIN - todos os registros que estão na interseção, mas também vai retornar os registros que não estão na inerseção: todos os dados da tabela da esquerda
      RIGHT JOIN - todos os registros que estão na interseção, mas também vai retornar os registros que não estão na inerseção: todos os dados da tabela da direita
      FULL JOIN- vai retornar tudo
      */
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name as category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`, [id]);
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

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ContactsRepository();
