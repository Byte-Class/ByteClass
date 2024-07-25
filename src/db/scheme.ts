import { uuid, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id"),
  name: text("name"),
  email: text("email"),
  img: text("img"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
