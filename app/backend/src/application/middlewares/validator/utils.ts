/* eslint-disable @typescript-eslint/naming-convention */
type WithUnderscoreProp<T extends object> = T extends { _: object } ? T : { _: T };

export const setUnderscoreProp = <
  T extends object | object & { _: object }
>(obj: T): WithUnderscoreProp<T> => {
  if (!("_" in obj)) return { _: obj } as WithUnderscoreProp<T>;
  return obj as WithUnderscoreProp<T>;
};

export const setUnderscoreParamsProp = <
  T extends object | object & { _: object }
>(obj: T): WithUnderscoreProp<T> => {
  if (!("_" in obj)) return { _: obj } as WithUnderscoreProp<T>;

  const { _, ...objWithoutUnderscode } = obj;

  const oldKeys = Object.keys(_);
  const currKeys = Object.keys(objWithoutUnderscode);
  const newKeys = currKeys.filter((key) => !oldKeys.includes(key));

  const currEntries = Object.entries(objWithoutUnderscode);
  const newEntries = currEntries.filter(([key]) => newKeys.includes(key));
  const oldEntries = currEntries.filter(([key]) => !newKeys.includes(key));

  const newProps = Object.fromEntries(newEntries);
  const oldProps = Object.fromEntries(oldEntries);

  return { ...oldProps, _: { ...newProps, ..._ } } as WithUnderscoreProp<T>;
};