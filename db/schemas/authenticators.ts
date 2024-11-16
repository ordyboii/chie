import * as sqlite from "drizzle-orm/sqlite-core";
import users from "./users";

export default sqlite.sqliteTable(
  "authenticator",
  {
    credentialID: sqlite.text().notNull().unique(),
    userId: sqlite
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: sqlite.text().notNull(),
    credentialPublicKey: sqlite.text().notNull(),
    counter: sqlite.integer().notNull(),
    credentialDeviceType: sqlite.text().notNull(),
    credentialBackedUp: sqlite
      .integer({
        mode: "boolean",
      })
      .notNull(),
    transports: sqlite.text(),
  },
  (authenticator) => ({
    compositePK: sqlite.primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);
