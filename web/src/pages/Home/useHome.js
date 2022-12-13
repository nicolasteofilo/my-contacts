import { useEffect, useState, useCallback, useTransition } from 'react';

import ContactsService from '../../service/ContactsService';

import { toast } from '../../utils/toast';

export default function useHome() {
  const [tabBeingSeen, setTabBeingSeen] = useState('Contatos');
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [isPending, startTransition] = useTransition();

  /* const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );
  */

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // all set states is URGENT UPDATE
      const contactsList = await ContactsService.listContacts(orderBy);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

   const handleToogleOrdeyBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
   }, [])

  function handleChangeSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase())));
    })
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
      handleCloseDeleteModal();
      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id)
      );
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato! Tente novamente mais tarde.',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  function handleChangeTabBeingSeen(tabName) {
    setTabBeingSeen(tabName);
  }

  return {
    isPending,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleTryAgain,
    handleToogleOrdeyBy,
    handleDeleteContact,
    handleChangeTabBeingSeen,
    tabBeingSeen,
    contactBeingDeleted,
    contacts,
    searchTerm,
    hasError,
    filteredContacts,
    orderBy,
  };
}
