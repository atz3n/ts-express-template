import { IGreetingStore } from "./IGreetingStore";
import GreetingStoreInMemory from "./GreetingStoreInMemory";


export enum GreetingStoreType {
    IN_MEMORY,
    MONGO_DB
}


export default class GreetingStoreFactory {
    private static inMemoryStore: IGreetingStore;


    public static getGreetingStore(type: GreetingStoreType): IGreetingStore {
        switch (type) {
            case GreetingStoreType.IN_MEMORY: {
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