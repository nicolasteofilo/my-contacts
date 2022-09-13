import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch(() => {});
  }, []);
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>
      <Header>
        <strong>
          {contacts.length} {contacts.length === 1 ? 'contatos' : 'contato'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img
              src={arrow}
              alt="seta para cima, para reordenar a listagem de contatos"
            />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
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
      </ListContainer>
    </Container>
  );
}
