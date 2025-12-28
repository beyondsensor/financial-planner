
import { db, users } from "@repo/db";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_should_be_changed";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

export const AuthService = {
    async login(body: unknown) {
        const { email, password } = LoginSchema.parse(body);

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (!user || !user.password) {
            throw new Error("Invalid credentials");
        }

        const isValid = await compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    },

    async register(body: unknown) {
        const { email, password, name } = RegisterSchema.parse(body);

        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await hash(password, 10);
        const id = crypto.randomUUID();

        const [user] = await db
            .insert(users)
            .values({
                id,
                email,
                password: hashedPassword,
                name,
                role: "user",
            })
            .returning();

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    },
};
