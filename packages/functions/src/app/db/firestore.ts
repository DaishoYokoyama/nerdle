import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import type { BaseObject } from "@/app/types";
import type { Firestore, WriteResult } from "firebase-admin/firestore";

initializeApp();

const db = getFirestore();

export class Database<T extends BaseObject> {
  private _db: Firestore;
  private _collection: string;

  constructor(collection: string) {
    this._db = db;
    this._collection = collection;
  }

  async get(id: string): Promise<T> {
    const doc = await this._db.collection(this._collection).doc(id).get();
    return doc.data() as T;
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this._db.collection(this._collection).get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async set(datas: T[]): Promise<WriteResult[]> {
    const batch = this._db.batch();
    datas.forEach((data) => {
      batch.set(this._db.collection(this._collection).doc(data.id), data);
    });
    return batch.commit();
  }

  async delete(id: string): Promise<WriteResult> {
    const doc = await this._db.collection(this._collection).doc(id);
    return doc.delete();
  }
}
