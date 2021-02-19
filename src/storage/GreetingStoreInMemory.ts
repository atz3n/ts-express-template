import Nonce from "../lib/Nonce";
import { IGreetingStore, Greeting } from "./IGreetingStore";


export default class GreetingStoreInMemory implements IGreetingStore {
    private readonly ID_LENGTH = 20;
    private readonly greetingStore: Greeting[] = [];


    public async storeGreeting(greeting: string): Promise<string> {
        const id = Nonce.generate(this.ID_LENGTH);
        this.greetingStore.push({ greeting, id });
        return id;
    }


    public async getGreeting(id: string): Promise<string> {
        const foundGreetings = this.greetingStore.filter((greetingObject) => {
            return id === greetingObject.id;
        });

        if (foundGreetings.length === 0) {
            return "";
        }

        return foundGreetings[0].greeting;
    }


    public async getGreetings(): Promise<Greeting[]> {
        return this.greetingStore;
    }


    public async updateGreeting(greetingObject: Greeting): Promise<void> {
        if (!this.getGreeting(greetingObject.id)) {
            throw new Error("Could not find greeting");
        }

        for (let i = 0 ; i < this.greetingStore.length ; i++) {
            if (this.greetingStore[i].id === greetingObject.id) {
                this.greetingStore[i].greeting = greetingObject.greeting;
                break;
            }
        }
    }


    public async deleteGreeting(id: string): Promise<void> {
        if (!this.getGreeting(id)) {
            throw new Error("Could not find greeting");
        }

        for (let i = 0 ; i < this.greetingStore.length ; i++) {
            if (this.greetingStore[i].id === id) {
                this.greetingStore.splice(i, 1);
                break;
            }
        }
    }
}