import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/scheme.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.CONNECTION_URL_POSTGRES,
  },
});
