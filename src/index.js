export class AsyncArray extends Array {
    constructor(...elements) {
      super(...elements);
    }
  
    async serialMap(callback) {
      const result = new AsyncArray()
      for (let i = 0; i < this.length; i++) {
        const mapped = await callback(this[i], i, this);
        result.push(mapped)
      }
      return result;
    }
  
    async parallelMap(callback) {
      const mapped = await Promise.all(this.map(callback));
      return AsyncArray.from(mapped)
    }
  }