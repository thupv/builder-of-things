const PROXY_MODE = {
  NONE: 0,
  DEFINE_BOOLEAN_MODE: 1,
  DEFINE_PROPERTY_MODE: 2
};

export class Thing {
  constructor(name) {
    this.name = name;
    this._proxy = {
      mode: PROXY_MODE.NONE,
      value: null
    };
    return proxify(this);
  }
}

function resetProxy(target) {
  target._proxy = {
    mode: PROXY_MODE.NONE,
    value: null
  };
}

function proxify(instance) {
  return new Proxy(instance, {
    get: (target, prop, receiver) => {
      if (target._proxy.mode === PROXY_MODE.DEFINE_BOOLEAN_MODE) {
        target[prop] = target._proxy.value;
        resetProxy(target);
      }

      if (target._proxy.mode === PROXY_MODE.DEFINE_PROPERTY_MODE) {
        if (target._proxy.value) {
          target[target._proxy.value] = prop;
          resetProxy(target);
          return prop;
        } else {
          target._proxy.value = prop;
          return receiver;
        }
      }

      const is_a_regex = /^is_a_/;
      const is_not_a_regex = /^is_not_a_/;
      if (prop === 'is_a' || prop === 'is_not_a') {
        target._proxy.mode = PROXY_MODE.DEFINE_BOOLEAN_MODE;
        target._proxy.value = prop === 'is_a';
        return receiver;
      }

      if (prop === 'is_the') {
        target._proxy.mode = PROXY_MODE.DEFINE_PROPERTY_MODE;
        target._proxy.value = null;
        return receiver;
      }

      if (is_a_regex.test(prop)) {
        let trueProp = prop.replace('is_a_', '');
        return target[trueProp];
      }
      if (is_not_a_regex.test(prop)) {
        let trueProp = prop.replace('is_not_a_', '');
        return target[trueProp];
      }
      return target[prop];
    }
  })
}