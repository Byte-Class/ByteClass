import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./scheme";
import postgres from "postgres";

const client = postgres(process.env.CONNECTION_URL_POSTGRES);
export const db = drizzle(client, { schema, logger: true });
