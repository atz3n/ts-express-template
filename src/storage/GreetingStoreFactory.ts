import { IGreetingStore } from "./IGreetingStore";
import { GreetingStoreInMemory } from "./GreetingStoreInMemory";
import { StorageType } from "./StorageType";


export class GreetingStoreFactory {
    private static inMemoryStore: IGreetingStore;


    public static getGreetingStore(type: StorageType): IGreetingStore {
        switch (type) {
            case StorageType.IN_MEMORY: {
                return this.getInMemoryStore();
            }
            default: {
                return this.getInMemoryStore();
            }
        }
    }

    private static getInMemoryStore(): IGreetingStore {
        if (!this.inMemoryStore) {
            this.inMemoryStore = new GreetingStoreInMemory();
        }
        return this.inMemoryStore;
    }
}