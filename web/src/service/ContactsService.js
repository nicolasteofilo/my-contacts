import HttpClient from './http/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contactss?orderBy=${orderBy}`)
  }
}

export default new ContactsService();
