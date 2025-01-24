export type ItemType = "folder" | "file";

export interface BaseItem {
  id: string;
  name: string;
  type: ItemType;
  parentId: string | null;
  createdAt: Date;
}

export interface Folder extends BaseItem {
  type: "folder";
  children: string[];
}

export interface File extends BaseItem {
  type: "file";
  content: string;
  updatedAt: Date;
}

export type FileSystemItem = Folder | File;

const DATABASE_NAME: string = "OS_DB";
const STORE_NAME: string = "OS_FS";
const DATABASE_VERSION = 1;

const openFS = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = (event) => {
      const fs = (event.target as IDBOpenDBRequest).result;
      if (!fs.objectStoreNames.contains(STORE_NAME)) {
        fs.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open database");
  });
};

export const addAttribute = async (item: FileSystemItem): Promise<void> => {
  const fs = await openFS();
  return new Promise((resolve, reject) => {
    const transaction = fs.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(item);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Failed to add item");
  });
};

export const getAttribute = async (
  id?: string
): Promise<FileSystemItem | FileSystemItem[]> => {
  const fs = await openFS();
  return new Promise((resolve, reject) => {
    const transaction = fs.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = id ? store.get(id) : store.getAll();

    request.onsuccess = () =>
      resolve(request.result as FileSystemItem | FileSystemItem[]);
    request.onerror = () => reject("Failed to get item");
  });
};

export const updateAttribute = async (item: FileSystemItem): Promise<void> => {
  const fs = await openFS();
  return new Promise((resolve, reject) => {
    const transaction = fs.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(item);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Failed to update item");
  });
};

export const deleteAttribute = async (id: string): Promise<void> => {
  const fs = await openFS();
  return new Promise((resolve, reject) => {
    const transaction = fs.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject("Failed to delete item");
  });
};
