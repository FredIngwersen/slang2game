export const withCatchError = async <
  T,
  E extends new (message?: string) => Error,
>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> => {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      if (errorsToCatch == undefined) return [error];
      if (errorsToCatch.some((e) => error instanceof e)) return [error];
      throw error;
    });
};

export const withCatchErrorSync = <
  T,
  E extends new (message?: string) => Error,
>(
  arg: T,
  errorsToCatch?: E[],
): [undefined, T] | [InstanceType<E>] => {
  try {
    return [undefined, arg] as [undefined, T];
  } catch (error) {
    if (errorsToCatch == undefined) return [error as InstanceType<E>];
    if (errorsToCatch.some((e) => error instanceof e))
      return [error as InstanceType<E>];
    throw error;
  }
};
