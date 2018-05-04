 class Subscriber {
    constructor (Dep) {
        Dep.target = this;
    }

    update () {
        Subscriber.add(this);
    }

    run() {
        // 执行内容
    }
}

let has = {};
let queue = [];
let waiting = false;

Subscriber.add = (instance) => {
    const id = instance.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(instance);

        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
};

module.exports = Subscriber;