import { pool } from "./src/db.js";

async function runCRUD() {
  try {
    // Clear table
    await pool.query("DELETE FROM books");
    await pool.query("ALTER SEQUENCE books_id_seq RESTART WITH 1");
    console.log("Database cleared and ID sequence reset.");

    // INSERT
    let result = await pool.query(
      `INSERT INTO books (isbn, title, author, year, publisher)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      ['9780553573404', 'A Game of Thrones', 'George R. R. Martin', 1997, 'Bantam']
    );
    const bookId = result.rows[0].id;
    console.log("Book inserted:", result.rows[0]);

    // SELECT
    result = await pool.query("SELECT * FROM books");
    console.log("Books in DB:", result.rows);

    // UPDATE
    result = await pool.query(
      "UPDATE books SET year = $1 WHERE id = $2 RETURNING *",
      [1998, bookId]
    );
    console.log("Book updated:", result.rows[0]);

    // DELETE
    result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [bookId]
    );
    console.log("Book deleted:", result.rows[0]);

    // SELECT after delete
    result = await pool.query("SELECT * FROM books");
    console.log("Books in DB (after delete):", result.rows);

    // INSERT again
    result = await pool.query(
      `INSERT INTO books (isbn, title, author, year, publisher)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      ['9780553573404', 'A Game of Thrones', 'George R. R. Martin', 1997, 'Bantam']
    );
    console.log("Book inserted again:", result.rows[0]);

    // FINAL SELECT
    result = await pool.query("SELECT * FROM books");
    console.log("Final books in DB:", result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

runCRUD();
