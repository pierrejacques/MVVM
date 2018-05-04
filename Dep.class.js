class Dep {
    constructor () {
        this.subscribers = [];
    }

    addSubscriber (subcriber) {
        this.subscribers.push(subcriber);
    }

    notify () {
        this.subscribers.forEach((subscriber) => {
            subscriber.update();
        })
    }
}

Dep.target = null;

module.exports = Dep;