const Dep = require('./Dep.class')
const Subscriber = require('./Subscriber.class');

function setReactive (obj, key, val) {

    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
                dep.notify();
        }
    });
}

function observe (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        setReactive(value, key, value[key]);
        observe(value[key]);
    });
}

class MVVM {
    constructor (options) {
        this._data = options.data;
        observe(this._data);
        
        new Subscriber(Dep);
    }
}

module.exports = MVVM;
