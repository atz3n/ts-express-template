import { app } from "./app";
import { EnvVars } from "./lib/EnvVars";


function main(): void {
  app.listen(EnvVars.PORT, () => {
    console.log(`Listening on port ${EnvVars.PORT}`);
  });
}

main();