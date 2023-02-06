import * as localforage from "localforage";

const db = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: "appdata",
});

export const save = (
  key: string,
  value: Record<string, unknown> | string | number | Array<unknown>
) => {
  const jsonString = JSON.stringify(value);
  return db.setItem(key, jsonString);
};

export const load = async <T>(key: string) => {
  const jsonString = await db.getItem<string>(key);
  if (!jsonString) return null;

  return JSON.parse(jsonString) as T;
};

export const remove = (key: string) => {
  return db.removeItem(key);
};

export const clear = () => db.clear();
