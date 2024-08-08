import { migrate } from 'drizzle-orm/node-postgres/migrator';
import db, { client } from './db_client.js';

// This command runs all migrations from the migrations folder and applies changes to the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './src/db/migrations' });

// Don't forget to close the connection, otherwise the script will hang
await client.end();
