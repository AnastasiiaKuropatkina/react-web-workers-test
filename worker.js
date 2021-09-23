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
    this.onmessage({data: Math.pow(data.data, 2)});
  }
}
