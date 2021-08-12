export default class RXEmitter {

  static get store() {
    if (!this.storeMap) {
      this.storeMap = {};
    }
    return this.storeMap;
  }

  static set store(val = null) {
    if (!this.storeMap) {
      this.storeMap = {};
    }
    this.storeMap = val;
  }

  static addListener(name = '', callback = null) {
    if (!name || typeof name !== 'string') {
      console.error('MonitorEmitter `addListener` name = null');
      return;
    }

    if (!callback || typeof callback !== 'function') {
      console.error('MonitorEmitter `addListener` callback = null');
      return;
    }
    let refMap = this.store[name] || {};
    refMap = callback;
    this.store[name] = refMap;
  }

  static removeLister() {
    this.store = {};
  }

  static emit(name = '', obj = {}) {
    if (!name || typeof name !== 'string') {
      console.error('MonitorEmitter `emit` name = null');
      return;
    }

    var callback = this.store[name] || {};
    if (callback && typeof callback === 'function') {
      callback(obj);
    }
  }
}