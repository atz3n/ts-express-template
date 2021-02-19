import dotenv from "dotenv";
import { GreetingStoreType } from "../storage/GreetingStoreFactory";


export default class EnvVars {
    private static isInitialized = false;

    public static AUTH_TOKEN = "";
    public static STORAGE_TYPE = GreetingStoreType.IN_MEMORY;
    public static PORT = 3000;


    public static load(): void {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;


        if (!process.env.IS_DOCKER) {
            dotenv.config();
        }


        if (!process.env.AUTH_TOKEN) {
            throw new Error("AUTH_TOKEN must be defined");
        }
        this.AUTH_TOKEN = process.env.AUTH_TOKEN;


        if (process.env.STORAGE_TYPE) {
            switch (process.env.STORAGE_TYPE) {
                case "IN_MEMORY": {
                    this.STORAGE_TYPE = GreetingStoreType.IN_MEMORY;
                    break;
                }
                default: {
                    throw new Error("STORAGE_TYPE not supported");
                }
            }
        }


        if (process.env.PORT) {
            try {
                this.PORT = parseInt(process.env.PORT);
            } catch (e) {
                throw new Error("PORT must be a number");
            }
        }
    }
}

EnvVars.load();