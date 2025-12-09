import { type RequestHandler } from "express";
import Joi from "joi";
import { pool } from "../db.js";

export interface Book {
  isbn: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
}

const BookSchema = Joi.object<Book>({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().required(),
  publisher: Joi.string().required(),
});

const UpdateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  year: Joi.number().integer().optional(),
  publisher: Joi.string().optional(),
}).min(1);

// CREATE
export const createBook: RequestHandler = async (req, res) => {
  const { error, value } = BookSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: "Invalid book data" });

  try {
    const existing = await pool.query("SELECT * FROM books WHERE isbn = $1", [value.isbn]);
    if (existing.rows.length) {
      return res.status(400).json({ success: false, message: "Book with this ISBN already exists" });
    }

    const result = await pool.query(
      "INSERT INTO books (isbn, title, author, year, publisher) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [value.isbn, value.title, value.author, value.year, value.publisher]
    );

    res.status(200).json({ success: true, book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// READ
export const getBook: RequestHandler = async (req, res) => {
  const { isbn } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE isbn = $1", [isbn]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// UPDATE
export const updateBook: RequestHandler = async (req, res) => {
  const { isbn } = req.params;
  const { error, value } = UpdateBookSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: "Invalid update data" });

  try {
    const existing = await pool.query("SELECT * FROM books WHERE isbn = $1", [isbn]);
    if (!existing.rows.length) return res.status(404).json({ success: false, message: "Book not found" });

    const updatedBook = { ...existing.rows[0], ...value };

    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, year=$3, publisher=$4 WHERE isbn=$5 RETURNING *",
      [updatedBook.title, updatedBook.author, updatedBook.year, updatedBook.publisher, isbn]
    );

    res.status(200).json({ success: true, book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// DELETE
export const deleteBook: RequestHandler = async (req, res) => {
  const { isbn } = req.params;

  try {
    const result = await pool.query("DELETE FROM books WHERE isbn=$1 RETURNING *", [isbn]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};
