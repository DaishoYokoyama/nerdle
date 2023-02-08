import admin from "firebase-admin";

import type { DataAccessObject } from "../domain";
import type { Firestore, WriteResult } from "firebase-admin/firestore";

admin.initializeApp();

const db = admin.firestore();

export class Database<T extends DataAccessObject> {
  private _db: Firestore;
  private _collection: string;

  constructor(collection: string) {
    this._db = db;
    this._collection = collection;
  }

  async get(id: string): Promise<T | undefined> {
    const doc = await this._db.collection(this._collection).doc(id).get();
    return doc.data() as T | undefined;
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this._db.collection(this._collection).get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async getLatest(): Promise<T | undefined> {
    const snapshot = await this._db
      .collection(this._collection)
      .limit(1)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return undefined;
    }
    return snapshot.docs[0].data() as T;
  }

  async set(data: T): Promise<WriteResult> {
    const result = this._db.collection(this._collection).doc(data.id).set(data);
    return result;
  }

  async delete(id: string): Promise<WriteResult> {
    const doc = await this._db.collection(this._collection).doc(id);
    return doc.delete();
  }
}
