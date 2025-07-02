import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv';
//const { Pool } = pkg;

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER ,
    password: process.env.DB_PASS ,
    database: process.env.DB_NAME ,
    synchronize: false, // ⚠️ En producción, cambiar a "false"
    logging: false,
    entities: ["src/entity/*.ts"], // Ubicación de entidades
    migrations: ["src/migration/*.ts"],
    subscribers: ["src/subscriber/*.ts"],
    extra: {
      clientEncoding: 'utf8mb4_unicode_ci'
    },
    
  });

/*
const Credenciales = {
    user: process.env.DB_USER || 'postgres' ,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'trc_activo',
    password: process.env.DB_PASS || 'root12345',
    port: process.env.DB_PORT || 5432,
    
}

export const pool = new Pool(Credenciales);
*/