"use server"
import { Pool } from "pg";

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
})

export async function query(q, v = []) {
    return await pool.query(q, v);
}

export async function register() {
    await query(`CREATE TABLE IF NOT EXISTS videos (
                id VARCHAR(11) PRIMARY KEY,
                uploader VARCHAR,
                title VARCHAR,
                description VARCHAR,
                duration BIGINT,
                categories JSONB,
                tags JSONB,
                ext VARCHAR,
                timestamp BIGINT
           )`);
    await query(`CREATE TABLE IF NOT EXISTS uploaders (
                id VARCHAR(24) PRIMARY KEY,
                name VARCHAR
           )`)
}

export async function videos(uploader) {
    const { rows: videos } = await query("SELECT * FROM videos WHERE uploader = $1", [uploader]);
    return videos;
}

export async function uploaders() {
    const { rows: uploaders } = await query("SELECT * FROM uploaders");
    return uploaders;
}