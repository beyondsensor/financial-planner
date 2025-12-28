import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    password: text("password"),
    role: text("role", { enum: ["user", "admin"] }).notNull().default("user"),
});
