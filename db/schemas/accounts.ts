import * as sqlite from "drizzle-orm/sqlite-core";
import users from "./users";
import { AdapterAccount } from "next-auth/adapters";

export default sqlite.sqliteTable(
  "account",
  {
    userId: sqlite
      .text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: sqlite.text().$type<AdapterAccount>().notNull(),
    provider: sqlite.text().notNull(),
    providerAccountId: sqlite.text().notNull(),
    refresh_token: sqlite.text(),
    access_token: sqlite.text(),
    expires_at: sqlite.integer(),
    token_type: sqlite.text(),
    scope: sqlite.text(),
    id_token: sqlite.text(),
    session_state: sqlite.text(),
  },
  (account) => ({
    compoundKey: sqlite.primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
