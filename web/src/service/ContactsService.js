import HttpClient from './http/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/8f6a5e4c-b552-41eb-a8d6-9ba1e7b2b7c6?orderBy=${orderBy}`)
  }
}

export default new ContactsService();
