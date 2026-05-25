import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';


// conexão e inicialização do banco de dados    
let db: Database | null = null;

export async function getDatabaseConnection(): Promise<Database> {
    if(db){
        return db;
    }

    // Cria ou abre o arquivo do banco na raiz da pasta backend
    db = await open({
        filename: path.resolve(__dirname, '../../database.sqlite'),
        driver: sqlite3.Database
    });

    // Cria a tabela de ranking se ela não existir (colunas em inglês usadas pelas queries)
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