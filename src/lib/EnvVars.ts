import dotenv from "dotenv";


export class EnvVars {
    private static isInitialized = false;
    public static GREET_TEXT_EN = "Hello World."
    public static GREET_TEXT_DE = "Hallo Welt."
    public static PORT = 3000;


    public static load(): void {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;
        dotenv.config();


        if (process.env.GREET_TEXT_EN) {
            this.GREET_TEXT_EN = process.env.GREET_TEXT_EN;
        }

        if (process.env.GREET_TEXT_DE) {
            this.GREET_TEXT_DE = process.env.GREET_TEXT_DE;
        }


        if (process.env.PORT) {
            try {
                this.PORT = parseInt(process.env.PORT);
            } catch (e) {
                throw new Error("PORT must be a number");
            }
        }
    }
}

EnvVars.load();