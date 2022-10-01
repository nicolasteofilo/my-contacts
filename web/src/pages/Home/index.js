import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import ContactsService from '../../service/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  async function loadContacts() {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts();
      setContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, [orderBy]);

  function handleToogleOrdeyBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangesearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangesearchTerm}
          type="text"
          placeholder="Pesquisar contato..."
        />
      </InputSearchContainer>
      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Cara triste" />
          <div className="details">
            <span>Ocorreu um erro ao obter os seus contatos!</span>
            <Button onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
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
        </>
      )}
    </Container>
  );
}
