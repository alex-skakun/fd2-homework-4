export class AsyncArray extends Array {
  constructor(...el) {
    super(...el);
  }

  serialMap(fn) {
    let newArr = new Array(this.length);
    return new Promise((resolve) => {
      for (let i = 0; i < this.length; i++) {
        newArr[i] = fn(this[i], [i], this);
      }
    });
  }

  parallelMap(fn) {
    let newArr = new Array(this.length);
    return new Promise((resolve) => {
      for (let i = 0; i < this.length; i++) {
        newArr[i] = fn(this[i], [i], this);
      }
    });
  }
}
