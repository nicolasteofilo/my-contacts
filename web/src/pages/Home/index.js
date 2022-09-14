import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch(() => {});
  }, [orderBy]);

  function handleToogleOrdeyBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangesearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  console.log({ searchTerm });

  return (
    <Container>
      <InputSearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangesearchTerm}
          type="text"
          placeholder="Pesquisar contato..."
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <header>
            <button type="button" onClick={handleToogleOrdeyBy}>
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
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            {contact.email && <span>{contact.email}</span>}
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Editar" />
            </Link>
            <button type="button">
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
