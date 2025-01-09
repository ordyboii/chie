import * as sql from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const users = sql.sqliteTable("users", {
  id: sql.text().primaryKey().$defaultFn(randomUUID),
});
