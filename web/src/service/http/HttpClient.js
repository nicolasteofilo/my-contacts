/* eslint-disable no-unused-vars */
import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put() {}

  delete() {}

  async makeRequest(path, options) {
    // await delay(2000);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if(options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody = null;

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, options.body);
  }
}

export default HttpClient;
