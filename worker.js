module.exports = class Worker {
  constructor() {
    // `onmessage` should be overwritten by the code using the worker.
    this.onmessage = () => { };
  }

  postMessage(data) {    
    this.onmessage({data: Math.pow(data.data, 2)});
  }
}