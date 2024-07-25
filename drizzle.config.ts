import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/scheme.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgres://dhruv:2563@127.0.0.1:5432/byteclass",
  },
});
