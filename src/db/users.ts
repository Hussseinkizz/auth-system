import { InferInsertModel, eq } from 'drizzle-orm';
import db from './db_client.js';
import { users } from './schema.js';

export type User = InferInsertModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const baseUserReturnObject = {
    userId: users.userId,
    username: users.username,
    email: users.email,
    isActive: users.isActive,
    other: users.other,
};

export const getUsers = async () => await db.select(baseUserReturnObject).from(users);

export const getUserByEmail = async (email: string) =>
    await db.select().from(users).where(eq(users.email, email));

export const getUserById = async (userId: string) =>
    await db.select(baseUserReturnObject).from(users).where(eq(users.userId, userId));

export const createUser = async (newUser: NewUser) =>
    await db.insert(users).values(newUser).returning(baseUserReturnObject);

// can be used to update user password or edit user data
export const updateUserById = async (userId: string, updatedUser: User) =>
    await db
        .update(users)
        .set(updatedUser)
        .where(eq(users.userId, userId))
        .returning(baseUserReturnObject);
