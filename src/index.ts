import app from "./app";
import EnvVars from "./lib/EnvVars";


function start(): void {
  EnvVars.load();

  app.listen(EnvVars.PORT, () => {
    console.log(`Listening on port ${EnvVars.PORT}`);
  });
}

start();