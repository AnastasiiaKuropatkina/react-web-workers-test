function fibonacci(num) {
    if (num === 1)
        return 0;
    if (num === 2)
        return 1;
    let num1 = 0;
    let num2 = 1;
    let sum;
    let i = 2;
    while (i < num) {
        sum = num1 + num2;
        num1 = num2;
        num2 = sum;
        i += 1;
    }
    return num2;
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
    this.onmessage({data: fibonacci(data)});
  }
}
