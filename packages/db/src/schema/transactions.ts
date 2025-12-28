import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { assets } from "./assets";

export const transactions = sqliteTable("transactions", {
    id: text("id").primaryKey(),
    assetId: text("asset_id")
        .notNull()
        .references(() => assets.id),
    type: text("type", { enum: ["buy", "sell", "transfer"] }).notNull(),
    amount: real("amount").notNull(),
    price: real("price").notNull(),
    date: integer("date", { mode: "timestamp" }).notNull(),
});
