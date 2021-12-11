function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = class Worker {
  constructor() {
    // `onmessage` should be overwritten by the code using the worker.
    this.onmessage = () => { };
  }

  addEventListener(eventType, callback){
    if (eventType === 'message'){
      this.onmessage = callback;
    }
  }

  postMessage(data) {    
    this.onmessage({data: fibonacci(data.data)});
  }
}
