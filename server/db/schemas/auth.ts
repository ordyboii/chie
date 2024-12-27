import * as sql from "drizzle-orm/sqlite-core";

export const user = sql.sqliteTable("user", {
  id: sql.text().primaryKey(),
  name: sql.text().notNull(),
  email: sql.text().notNull().unique(),
  emailVerified: sql
    .integer({
      mode: "boolean",
    })
    .notNull(),
  image: sql.text(),
  createdAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
});

export const session = sql.sqliteTable("session", {
  id: sql.text().primaryKey(),
  expiresAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  token: sql.text().notNull(),
  ipAddress: sql.text(),
  userAgent: sql.text(),
  userId: sql
    .text()
    .notNull()
    .references(() => user.id),
  createdAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
});

export const account = sql.sqliteTable("account", {
  id: sql.text().primaryKey(),
  accountId: sql.text().notNull(),
  providerId: sql.text().notNull(),
  userId: sql
    .text()
    .notNull()
    .references(() => user.id),
  accessToken: sql.text(),
  refreshToken: sql.text(),
  idToken: sql.text(),
  accessTokenExpiresAt: sql.integer({
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: sql.integer({
    mode: "timestamp",
  }),
  scope: sql.text(),
  password: sql.text(),
  createdAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
});

export const verification = sql.sqliteTable("verification", {
  id: sql.text().primaryKey(),
  identifier: sql.text().notNull(),
  value: sql.text().notNull(),
  expiresAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  createdAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer({
      mode: "timestamp",
    })
    .notNull(),
});
