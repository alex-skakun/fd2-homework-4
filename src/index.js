export class AsyncArray extends Array {

    async serialMap (fn, ctx) {
        const mapped = new Array (this.length);
        for (let i = 0; i < this.length; i++) {
            mapped[i] = await fn.call(ctx, this[i], i, this)
        }

        return mapped;
    }

    async parallelMap (fn, ctx) {
        const mapped = new Array (this.length);
        for (let i = 0; i < this.length; i++) {
            mapped[i] = fn.call(ctx, this[i], i, this)
        }

        return Promise.all(mapped);
    }
}