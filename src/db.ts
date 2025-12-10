import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "books_example",
    password: "Antono14!",
    port: 5432
});