type Data = unknown;
type Callback = (data: Data) => void;

class Queue {
    private readonly listeners: { [key: string]: Callback[] };

    constructor() {
        this.listeners = {};
    }

    notify(type: string, payload?: Data) {
        if (this.listeners[type] !== undefined) {
            this.listeners[type].forEach((callback) => {
                callback(payload);
            });
        }
    }

    listen(type: string, callback: Callback) {
        if (this.listeners[type] === undefined) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(callback);
    }
}

export const queue = new Queue();
