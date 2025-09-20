import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../utils";

export const db = drizzle(env.DATABASE_URL);
