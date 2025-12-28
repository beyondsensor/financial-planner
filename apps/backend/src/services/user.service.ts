import { db, users } from '@repo/db';
import { eq } from 'drizzle-orm';

export class UserService {
    async getAll() {
        return await db.select().from(users);
    }

    async getById(id: string) {
        const result = await db.select().from(users).where(eq(users.id, id));
        return result[0];
    }

    async create(data: typeof users.$inferInsert) {
        return await db.insert(users).values(data).returning();
    }

    async update(id: string, data: Partial<typeof users.$inferInsert>) {
        return await db.update(users).set(data).where(eq(users.id, id)).returning();
    }

    async delete(id: string) {
        return await db.delete(users).where(eq(users.id, id)).returning();
    }
}
