import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const portfolios = sqliteTable("portfolios", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    name: text("name").notNull(),
    description: text("description"),
});
