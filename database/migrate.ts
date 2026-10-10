import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
  const ds = new DataSource({ type: 'postgres', url: process.env.DATABASE_URL, entities: [], synchronize: false });
  await ds.initialize();
  try {
    await ds.query('CREATE TABLE IF NOT EXISTS "_wildfire_migrations" (name text PRIMARY KEY, "appliedAt" timestamptz NOT NULL DEFAULT now())');
    const name = '001_init.sql';
    const exists = await ds.query('SELECT 1 FROM "_wildfire_migrations" WHERE name=$1', [name]);
    if (!exists.length) { const sql = await readFile(join(__dirname, 'migrations', name), 'utf8'); await ds.query('BEGIN'); try { await ds.query(sql); await ds.query('INSERT INTO "_wildfire_migrations" (name) VALUES ($1)', [name]); await ds.query('COMMIT'); } catch (e) { await ds.query('ROLLBACK'); throw e; } }
    console.log('Database migration complete.');
  } finally { await ds.destroy(); }
}
main().catch(e => { console.error(e); process.exit(1) });
