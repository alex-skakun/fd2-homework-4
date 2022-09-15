export class AsyncArray extends Array {
    constructor(...numbers) {
        super();
        this.arrNumbers = numbers;
    }

    async serialMap(fn, ctx) {
        const mapped = new Array(this.arrNumbers.length);

        for (let i = 0; i < this.arrNumbers.length; i++) {
            mapped[i] = await fn.call(ctx, this.arrNumbers[i], i, this.arrNumbers);
        }

        return new Promise(mapped);
    }

    async parallelMap() {
        const mapped = new Array(this.arrNumbers.length);

        return Promise.all(mapped);
    }

}