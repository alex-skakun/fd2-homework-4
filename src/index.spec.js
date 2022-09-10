import { jest } from '@jest/globals';
import { AsyncArray } from './index.js';


describe('fd2-homework-4', () => {

  it('should create AsyncArray', () => {
    const array = new AsyncArray();

    expect(array instanceof AsyncArray).toBeTruthy();
  });

  it('should be subclass of Array', () => {
    const array = new AsyncArray();

    expect(array instanceof Array).toBeTruthy();
  });

  it('should create empty array with fixed length', () => {
    const array = new AsyncArray(10);

    expect(array.length).toBe(10);
  });

  it('should create an array with specified elements', () => {
    const array = new AsyncArray('a', 'b', 'c');

    expect(array.join()).toBe('a,b,c');
  });

  describe('serialMap', () => {

    it('should pass 3 arguments into callback', async () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray('test');

      await array.serialMap(callback);

      expect(callback).toHaveBeenCalledWith('test', 0, ['test']);
    });

    it('should invoke callback for each element', async () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray(1, 2, 3);

      await array.serialMap(callback);

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should return promise', () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray(1, 2, 3);

      const result = array.serialMap(callback);

      expect(result instanceof Promise).toBeTruthy();
    });

    it('should transform elements', async () => {
      const callback = (el, index) => new Promise(resolve => setTimeout(() => resolve({
        value: String(el),
        index,
      }), index * 100));
      const array = new AsyncArray(1, 2, 3);

      const result = await array.serialMap(callback);

      expect(result).toEqual([
        {
          value: '1',
          index: 0,
        },
        {
          value: '2',
          index: 1,
        },
        {
          value: '3',
          index: 2,
        },
      ]);
    });

    it('total time should be sum of all times', async () => {
      const callback = (el, index) => new Promise(resolve => setTimeout(() => resolve(el), index * 100));
      const array = new AsyncArray(1, 2, 3);

      const startTime = Date.now();
      const result = await array.serialMap(callback);
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThan(300);
    });

  });

  describe('parallelMap', () => {

    it('should pass 3 arguments into callback', async () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray('test');

      await array.parallelMap(callback);

      expect(callback).toHaveBeenCalledWith('test', 0, ['test']);
    });

    it('should invoke callback for each element', async () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray(1, 2, 3);

      await array.parallelMap(callback);

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should return promise', () => {
      const callback = jest.fn(async (el) => el);
      const array = new AsyncArray(1, 2, 3);

      const result = array.parallelMap(callback);

      expect(result instanceof Promise).toBeTruthy();
    });

    it('should transform elements', async () => {
      const callback = (el, index) => new Promise(resolve => setTimeout(() => resolve({
        value: String(el),
        index,
      }), index * 100));
      const array = new AsyncArray(1, 2, 3);

      const result = await array.parallelMap(callback);

      expect(result).toEqual([
        {
          value: '1',
          index: 0,
        },
        {
          value: '2',
          index: 1,
        },
        {
          value: '3',
          index: 2,
        },
      ]);
    });

    it('total time should be equal to longest time', async () => {
      const callback = (el, index) => new Promise(resolve => setTimeout(() => resolve(el), index * 100));
      const array = new AsyncArray(1, 2, 3);

      const startTime = Date.now();
      const result = await array.parallelMap(callback);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(210);
    });

  });

});
