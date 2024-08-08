import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema.js';
import 'dotenv/config';

export const client = new Client({
    host: process.env.DB_HOST as string,
    // port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
});

await client
    .connect()
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch(error => {
        console.error('Database Connection error', error);
    });

// { schema } is used for relational queries
const db = drizzle(client, { schema: schema });

export default db;
