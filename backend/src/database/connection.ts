// / [DRIVEN-MODULE-REF-1092]
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname nao existe em modulos ESM - recria a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// conexao e inicializacao do banco de dados
let db: Database | null = null;

export async function getDatabaseConnection(): Promise<Database> {
    if (db) {
        return db;
    }

    // Cria ou abre o arquivo do banco na raiz da pasta backend
    db = await open({
        filename: resolve(__dirname, '../../database.sqlite'),
        driver: sqlite3.Database
    });

    // Cria a tabela de ranking se ela nao existir
    await db.exec(`
        CREATE TABLE IF NOT EXISTS ranking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            score INTEGER NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    return db;
}
