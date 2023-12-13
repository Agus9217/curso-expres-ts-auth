import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_DB: get("MONGO_DB").required().asUrlString(),
};
