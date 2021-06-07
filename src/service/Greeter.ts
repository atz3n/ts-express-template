import { EnvVars } from "../lib/EnvVars";


export class Greeter {
    private name = "";


    constructor(name: string) {
        this.name = name;
    }


    public greet(language: string): string {
        let greetingText = "";

        if (language.toLowerCase() === "en") {
            greetingText = `${EnvVars.GREET_TEXT_EN} Your name is ${this.name}.`;
        }

        if (language.toLowerCase() === "de") {
            greetingText = `${EnvVars.GREET_TEXT_DE} Dein Name ist ${this.name}.`;
        }


        return greetingText;
    }
}