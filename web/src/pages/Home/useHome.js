import { useEffect, useState, useCallback, useMemo, useDeferredValue } from 'react';

import ContactsService from '../../service/ContactsService';

import { toast } from '../../utils/toast';

export default function useHome() {
  const [tabBeingSeen, setTabBeingSeen] = useState('Contatos');
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm); // the searchTerm is a URGENT, but deferredSearchTerm is a transition

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
      ),
    [contacts, deferredSearchTerm]
  );

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      
      // all set states is URGENT UPDATE
      const contactsList = await ContactsService.listContacts(signal, orderBy);
      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      if(error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    }
  }, [loadContacts]);

   const handleToogleOrdeyBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
   }, [])

  function handleChangeSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(value);
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
