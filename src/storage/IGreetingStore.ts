export type Greeting = {
    greeting: string;
    id: string;
}


export interface IGreetingStore {
    storeGreeting(greeting: string): Promise<string>;
    getGreeting(id: string): Promise<string | undefined>;
    getGreetings(): Promise<Greeting[]>;
    updateGreeting(greetingObject: Greeting): Promise<void>;
    deleteGreeting(id: string): Promise<void>;
}