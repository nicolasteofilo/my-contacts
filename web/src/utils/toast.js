import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export function toast(type, text) {
  toastEventManager.emit('addtoast', { type, text })
}
