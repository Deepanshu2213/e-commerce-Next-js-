import { Document, Model } from 'mongoose';
import { unstable_cache } from 'next/cache';
export const getKey = <T extends Document>(
  model: Model<T>,
  id?: string,
): string => {
  return `${model.modelName}-${id || ''}`;
};
export const getById = async <T extends Document, L>(
  model: Model<T>,
  id: string,
  projection?: Record<string, 1 | 0>,
): Promise<L | null> => {
  const cachedFn = unstable_cache(
    async () => {
      console.log('db hit' + getKey<T>(model, id));
      return await model.findById(id).select(projection || {}).lean<L>();
    },
    [getKey<T>(model, id)],
    {
      tags: [getKey<T>(model, id)],
    },
  );
  return await cachedFn();
};
type fn = (...args: any) => void;
export const debounceFn = (fn: (...args: any) => any, timer: number): fn => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, timer);
  };
};
export const throttleFn = (fn: (...args: any) => any, timeLimit: number) => {
  let execTime = 0;
  return function (...args: any) {
    const curr = Date.now();
    if (curr - execTime >= timeLimit) {
      fn(...args);
      execTime = Date.now();
    }
  };
};

export const getEntityList = async <T extends Document, L>(
  model: Model<T>,
): Promise<L[] | null> => {
  const cacheFn = unstable_cache(
    async () => {
      console.log('db hit ' + getKey<T>(model) + ' list');
      return await model.find().limit(50).lean<L[]>();
    },
    [getKey<T>(model)],
    {
      tags: [getKey<T>(model)],
    },
  );
  return await cacheFn();
};

export const getCart = async <T extends Document, L>(
  userId: string,
  model: Model<T>,
): Promise<L | null> => {
  const cacheFn = unstable_cache(
    async () => {
      console.log('db hit' + getKey<T>(model, userId));
      return await model
        .findOne({ User: userId })
        .populate('ProductItem.Product')
        .lean<L>();
    },
    [getKey<T>(model, userId)],
    {
      tags: [getKey<T>(model, userId)],
    },
  );
  return await cacheFn();
};
export const getCartModel = async <T extends Document>(
  userId: string,
  model: Model<T>,
): Promise<T | null> => {
  const cacheFn = unstable_cache(
    async () => {
      console.log('db hit' + getKey<T>(model, userId));
      return await model
        .findOne({ User: userId })
        .populate('ProductItem.Product');
    },
    [getKey<T>(model, userId)],
    {
      tags: [getKey<T>(model, userId)],
    },
  );
  return await cacheFn();
}
