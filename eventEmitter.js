class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Register event listener
    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    // Alias for on
    addEventListener(eventName, listener) {
        this.on(eventName, listener);
    }

    // Remove event listener
    off(eventName, listener) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((fn) => fn !== listener);
        }
    }

    // Alias for off
    removeEventListener(eventName, listener) {
        this.off(eventName, listener);
    }

    // Register event listener that runs once
    once(eventName, listener) {
        const onceWrapper = (...args) => {
            listener(...args);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }

    // Emit an event with optional arguments
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((listener) => {
                listener(...args);
            });
        }
    }

    // Get an array of raw event listeners
    rawListeners(eventName) {
        return this.events[eventName] || [];
    }

    // Get the count of listeners for an event
    listenerCount(eventName) {
        return this.events[eventName] ? this.events[eventName].length : 0;
    }
}

module.exports = EventEmitter;
