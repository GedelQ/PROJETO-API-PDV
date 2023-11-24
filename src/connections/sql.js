import 'dotenv/config';
import pg from 'pg';

export const pool = new pg.Pool({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USER,
    password: process.env.SQL_PW,
    database: process.env.SQL_DATABASE,
})