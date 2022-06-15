class ContactController {
  index(request, response) {
    response.json({ message: 'List contacts' });
  }

  show() {}

  store() {}

  update() {}

  delete() {}
}

module.exports = new ContactController();
