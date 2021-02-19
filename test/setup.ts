import EnvVars from "../src/lib/EnvVars";
import { GreetingStoreType } from "../src/storage/GreetingStoreFactory";


EnvVars.AUTH_TOKEN = "testToken";
EnvVars.STORAGE_TYPE = GreetingStoreType.IN_MEMORY;