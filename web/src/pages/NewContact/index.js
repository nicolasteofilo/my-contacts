import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';

export default function NewContact() {
  return (
    <>
      <PageHeader title="Novo contato" />
      <Input placeholder="Nome" />
      <Select placeholder="Categoria">
        <option value="instagram">Instagram</option>
        <option value="linkedin">Linkedin</option>
        <option value="discord">Discord</option>
      </Select>
    </>
  );
}
