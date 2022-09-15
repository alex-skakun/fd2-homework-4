export class AsyncArray extends Array {
    constructor(...elements){
        super(...elements);
    }
    async serialMap(func, context) {
        const mapped = new Array (this.length);
        for (let i = 0 ; i < this.length; i++){
            mapped[i] =  await func.call(context, this[i], i, this)
        }
        return mapped;
    }
     async parallelMap(func, context) {
        const mapped = new Array (this.length); 
        for (let i = 0 ; i < this.length; i++){
            mapped[i] = func.call(context, this[i], i, this)
        }
        return Promise.all(mapped);
    }
}
