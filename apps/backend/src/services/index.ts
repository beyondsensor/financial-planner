import { db, portfolios, assets, transactions } from '@repo/db';
import { eq } from 'drizzle-orm';

export class PortfolioService {
    async getAll() {
        return await db.select().from(portfolios);
    }

    async getById(id: string) {
        const result = await db.select().from(portfolios).where(eq(portfolios.id, id));
        return result[0];
    }

    async create(data: typeof portfolios.$inferInsert) {
        return await db.insert(portfolios).values(data).returning();
    }

    async update(id: string, data: Partial<typeof portfolios.$inferInsert>) {
        return await db.update(portfolios).set(data).where(eq(portfolios.id, id)).returning();
    }

    async delete(id: string) {
        return await db.delete(portfolios).where(eq(portfolios.id, id)).returning();
    }
}

export class AssetService {
    async getAll() {
        return await db.select().from(assets);
    }

    async getById(id: string) {
        const result = await db.select().from(assets).where(eq(assets.id, id));
        return result[0];
    }

    async create(data: typeof assets.$inferInsert) {
        return await db.insert(assets).values(data).returning();
    }

    async update(id: string, data: Partial<typeof assets.$inferInsert>) {
        return await db.update(assets).set(data).where(eq(assets.id, id)).returning();
    }

    async delete(id: string) {
        return await db.delete(assets).where(eq(assets.id, id)).returning();
    }
}

export class TransactionService {
    async getAll() {
        return await db.select().from(transactions);
    }

    async getById(id: string) {
        const result = await db.select().from(transactions).where(eq(transactions.id, id));
        return result[0];
    }

    async create(data: typeof transactions.$inferInsert) {
        return await db.insert(transactions).values(data).returning();
    }

    async update(id: string, data: Partial<typeof transactions.$inferInsert>) {
        return await db.update(transactions).set(data).where(eq(transactions.id, id)).returning();
    }

    async delete(id: string) {
        return await db.delete(transactions).where(eq(transactions.id, id)).returning();
    }
}
