const PROXY_MODE = {
  NONE: 0,
  DEFINE_BOOLEAN_MODE: 1,
  DEFINE_PROPERTY_MODE: 2,
  DEFINE_CHILD_THING: 3,
  DEFINE_METHOD: 4
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
      if (target._proxy.mode === PROXY_MODE.DEFINE_METHOD) {
        resetProxy(target);
        return (fnName, fn) => {
          target[prop] = (...args) => {
            const res = instance_call(target, fn, ...args);
            target[fnName] = res;
          };
        }
      }

      if (target._proxy.mode === PROXY_MODE.DEFINE_CHILD_THING) {
        if (target._proxy.value === 1) {
          target[prop] = new Thing();
        } else if (target._proxy.value > 1) {
          target[prop] = [];
          for (let i = 0; i < target._proxy.value; i++) {
            target[prop].push(new Thing());
          }
        }
        resetProxy(target);
      }

      if (target._proxy.mode === PROXY_MODE.DEFINE_BOOLEAN_MODE) {
        target[prop] = target._proxy.value;
        resetProxy(target);
      }

      if (target._proxy.mode === PROXY_MODE.DEFINE_PROPERTY_MODE) {
        if (target._proxy.value) {
          target[target._proxy.value] = prop;
          resetProxy(target);
          return receiver;
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

      if (prop === 'is_the' || prop === 'being_the' || prop === 'and_the') {
        target._proxy.mode = PROXY_MODE.DEFINE_PROPERTY_MODE;
        target._proxy.value = null;
        return receiver;
      }

      if (prop === 'has' || prop === 'having') {
        return (numberOfThings) => {
          target._proxy.mode = PROXY_MODE.DEFINE_CHILD_THING;
          target._proxy.value = numberOfThings;
          return receiver;
        };
      }

      if (prop === 'can') {
        target._proxy.mode = PROXY_MODE.DEFINE_METHOD;
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

function instance_call(instance, fn, ...args) {
  const oldWindow = window;
  for(let attr in instance) {
    window[attr] = instance[attr];
  }
  const res = fn(args);

  for(let attr in instance) {
    window[attr] = oldWindow[attr];
  }
  return res;
}