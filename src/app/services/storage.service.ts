import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  private map: Map<string, string> = new Map<string, string>();

  constructor(private storage: Storage) {}

  mapAll(): Promise<void> {
    this.map.clear();
    return this.storage.forEach((value: string, key: string) => {
      this.map.set(key, value);
    });
  }

  get(key: string): any {
    return (this.map.has(key)) ? JSON.parse(this.map.get(key)) : undefined;
  }

  async set(key: string, value: any) {
    value = JSON.stringify(value);
    this.map.set(key, value);
    await this.storage.set(key, value);
  }

  unset(key: string) {
    this.map.delete(key);
    this.storage.remove(key);
  }
}
