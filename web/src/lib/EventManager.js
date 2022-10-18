export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]?.push(listener);
  }

  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }
}

const toastEventManager = new EventManager();
toastEventManager.on('addtoast', (payload) => {
  console.log(payload);
});
toastEventManager.on('addtoast', (payload) => {
  console.log(payload);
});
toastEventManager.emit('addtoast', {
  type: 'success',
  text: 'Contato cadastrado com sucesso!',
});
console.log(toastEventManager);
