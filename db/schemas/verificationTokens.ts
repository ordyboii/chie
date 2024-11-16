import * as sqlite from "drizzle-orm/sqlite-core";

export default sqlite.sqliteTable(
  "verificationToken",
  {
    identifier: sqlite.text().notNull(),
    token: sqlite.text().notNull(),
    expires: sqlite.integer({ mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: sqlite.primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);
