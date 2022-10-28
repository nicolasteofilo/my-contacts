/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

import { Card, ListHeader } from './styles';

export default function ContactsList({
  filteredContacts,
  onDeleteContact,
  onToogleOrdeyBy,
  orderBy,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <header>
            <button type="button" onClick={onToogleOrdeyBy}>
              <span>Nome</span>
              <img
                src={arrow}
                alt="seta para cima, para reordenar a listagem de contatos"
              />
            </button>
          </header>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            {contact.email && <span>{contact.email}</span>}
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Editar" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string,
      })
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onToogleOrdeyBy: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
};
