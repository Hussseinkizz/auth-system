import { boolean, date, json, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// Define the Users table
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    userId: uuid('userId').defaultRandom().unique(),
    tstamp: timestamp('tstamp').defaultNow(),
    username: text('username').notNull(),
    token: text('token').notNull(),
    email: text('email').notNull().unique(),
    dateJoined: date('dateJoined').defaultNow(),
    other: json('other').default({}),
    password: text('password').notNull(),
    isActive: boolean('isActive').default(true),
});
