export class AsyncArray extends Array {
    constructor(...elements) {
        super(...elements);
      this.data = [...elements]
    }

    async serialMap (callback) {
        const result = await []
        const test = this.data.map(async (el, index, arr) => {
            console.log(555);
          const mapped = await callback(el, index, arr);
          console.log(444, mapped)
          result.push(mapped)
        })
        console.log(333, result);
        return test;
      }
    
      async parallelMap(callback) {
        const mapped = await Promise.all(this.map(callback));
        return AsyncArray.from(mapped)
      }
}