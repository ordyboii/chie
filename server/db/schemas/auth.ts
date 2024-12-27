import * as sql from "drizzle-orm/sqlite-core";

export const user = sql.sqliteTable("user", {
  id: sql.text("id").primaryKey(),
  name: sql.text("name").notNull(),
  firstName: sql.text("firstName"),
  lastName: sql.text("lastName"),
  email: sql.text("email").notNull().unique(),
  emailVerified: sql
    .integer("emailVerified", {
      mode: "boolean",
    })
    .notNull(),
  image: sql.text("image"),
  createdAt: sql
    .integer("createdAt", {
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer("updatedAt", {
      mode: "timestamp",
    })
    .notNull(),
});

export const session = sql.sqliteTable("session", {
  id: sql.text("id").primaryKey(),
  expiresAt: sql
    .integer("expiresAt", {
      mode: "timestamp",
    })
    .notNull(),
  ipAddress: sql.text("ipAddress"),
  userAgent: sql.text("userAgent"),
  userId: sql
    .text("userId")
    .notNull()
    .references(() => user.id),
  createdAt: sql
    .integer("createdAt", {
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer("updatedAt", {
      mode: "timestamp",
    })
    .notNull(),
});

export const account = sql.sqliteTable("account", {
  id: sql.text("id").primaryKey(),
  accountId: sql.text("accountId").notNull(),
  providerId: sql.text("providerId").notNull(),
  userId: sql
    .text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: sql.text("accessToken"),
  refreshToken: sql.text("refreshToken"),
  idToken: sql.text("idToken"),
  expiresAt: sql.integer("expiresAt", {
    mode: "timestamp",
  }),
  password: sql.text("password"),
  createdAt: sql
    .integer("createdAt", {
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer("updatedAt", {
      mode: "timestamp",
    })
    .notNull(),
});

export const verification = sql.sqliteTable("verification", {
  id: sql.text("id").primaryKey(),
  identifier: sql.text("identifier").notNull(),
  value: sql.text("value").notNull(),
  expiresAt: sql
    .integer("expiresAt", {
      mode: "timestamp",
    })
    .notNull(),
  createdAt: sql
    .integer("createdAt", {
      mode: "timestamp",
    })
    .notNull(),
  updatedAt: sql
    .integer("updatedAt", {
      mode: "timestamp",
    })
    .notNull(),
});
