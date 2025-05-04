import dotenv from 'dotenv';
dotenv.config();
import pg from "pg";

const dbConfig = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    dialectModule: pg,
    pool: {
        max: 2,
        min: 0,
        acquire: 3000,
        idle: 0,
        evict: 8000
    },
};

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'your-fallback-secret-key',
    expiresIn: '1h'
};

export default dbConfig;