"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
async function main() {
    if (!process.env.DATABASE_URL)
        throw new Error('DATABASE_URL is required');
    const ds = new typeorm_1.DataSource({ type: 'postgres', url: process.env.DATABASE_URL, entities: [], synchronize: false });
    await ds.initialize();
    try {
        await ds.query('CREATE TABLE IF NOT EXISTS "_wildfire_migrations" (name text PRIMARY KEY, "appliedAt" timestamptz NOT NULL DEFAULT now())');
        const name = '001_init.sql';
        const exists = await ds.query('SELECT 1 FROM "_wildfire_migrations" WHERE name=$1', [name]);
        if (!exists.length) {
            const sql = await (0, promises_1.readFile)((0, node_path_1.join)(__dirname, 'migrations', name), 'utf8');
            await ds.query('BEGIN');
            try {
                await ds.query(sql);
                await ds.query('INSERT INTO "_wildfire_migrations" (name) VALUES ($1)', [name]);
                await ds.query('COMMIT');
            }
            catch (e) {
                await ds.query('ROLLBACK');
                throw e;
            }
        }
        console.log('Database migration complete.');
    }
    finally {
        await ds.destroy();
    }
}
main().catch(e => { console.error(e); process.exit(1); });
//# sourceMappingURL=migrate.js.map