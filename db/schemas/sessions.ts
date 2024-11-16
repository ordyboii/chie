import * as sqlite from "drizzle-orm/sqlite-core";
import users from "./users";

export default sqlite.sqliteTable("session", {
  sessionToken: sqlite.text().primaryKey(),
  userId: sqlite
    .text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: sqlite.integer({ mode: "timestamp_ms" }).notNull(),
});
