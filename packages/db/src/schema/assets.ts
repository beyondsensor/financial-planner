import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { portfolios } from "./portfolios";

export const assets = sqliteTable("assets", {
    id: text("id").primaryKey(),
    portfolioId: text("portfolio_id")
        .notNull()
        .references(() => portfolios.id),
    symbol: text("symbol").notNull(),
    name: text("name").notNull(),
    quantity: real("quantity").notNull(),
    type: text("type", { enum: ["stock", "crypto", "cash", "other"] }).notNull(),
});
