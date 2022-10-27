import { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ContactsService from '../../service/ContactsService';
import { toast } from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMonted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch (error) {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Ocorreu um erro ao buscar os dados do contato!',
          });
        });
      }
    }
    loadContact();
  }, [id, history, isMounted, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const response = await ContactsService.updateContact(id, contact);
      setContactName(response.name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato! Tente novamente mais tarde.',
      });
    }
  }

  return { isLoading, contactName, contactFormRef, handleSubmit  }
}
