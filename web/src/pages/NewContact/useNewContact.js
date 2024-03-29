import { useRef } from 'react';
import ContactsService from '../../service/ContactsService';
import { toast } from '../../utils/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);
      contactFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato! Tente novamente mais tarde.',
      });
    }
  }

  return { contactFormRef, handleSubmit };
}
