import { randomUUID } from "node:crypto";

interface IDB<T> {
  find(): Promise<T[]>;
  findOne(id: string): Promise<T | undefined>;
  create(data: T): Promise<T>;
  update(data: T): Promise<T>;
  delete(id: string): void;
}

export class DB<T = any> implements IDB<T> {
  protected _source: T[] = [];

  public async find() {
    return this._source;
  }

  public async findOne(id: string) {
    return this._source.find((item: any) => item.id === id);
  }

  public async create(data: any) {
    this._source.push(data);
    return data;
  }

  public async update(data: any) {
    const index = this._source.findIndex((item: any) => item.id === data.id);

    if (index < 0) throw new Error(`Data undefined`);

    this._source[index] = data;

    return data;
  }

  public async delete(id: string) {
    this._source = this._source.filter((item: any) => item.id !== id);
  }
}
