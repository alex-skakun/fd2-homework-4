export class AsyncArray extends Array {
  constructor(...el) {
    super(...el);
  }

  async serialMap(fn, ctx) {
    let newArr = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
      newArr[i] = await fn.call(ctx, this[i], [i], this);
    }
    return newArr;
  }

  async parallelMap(fn, ctx) {
    let newArr = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
      newArr[i] = fn.call(this[i], [i], this);
    }
    return await Promise.all(newArr);
  }
}
