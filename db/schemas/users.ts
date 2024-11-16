import * as sqlite from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export default sqlite.sqliteTable("user", {
  id: sqlite
    .text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: sqlite.text(),
  email: sqlite.text().unique(),
  emailVerified: sqlite.integer({ mode: "timestamp_ms" }),
  image: sqlite.text(),
});
