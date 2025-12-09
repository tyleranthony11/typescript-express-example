import { type RequestHandler } from "express";
import Joi from "joi";

export interface Book {
  isbn: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
}

const DEMO_BOOKS: Book[] = [];

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

export const createBook: RequestHandler = (req, res) => {
  const { error, value } = BookSchema.validate(req.body);
  if (error) {
    res.status(400).json({ success: false, message: "Invalid book data" });
    return;
  }

  const existing = DEMO_BOOKS.find((b) => b.isbn === value.isbn);
  if (existing) {
    res.status(400).json({
      success: false,
      message: "Book with this ISBN already exists",
    });
    return;
  }

  DEMO_BOOKS.push(value);
  res.status(200).json({ success: true, book: value });
};

export const getBook: RequestHandler = (req, res) => {
  const { isbn } = req.params;
  const book = DEMO_BOOKS.find((b) => b.isbn === isbn);
  if (!book) {
    res.status(404).json({ success: false, message: "Book not found" });
    return;
  }

  res.status(200).json({ success: true, book });
};

export const updateBook: RequestHandler = (req, res) => {
  const { isbn } = req.params;
  const { error, value } = UpdateBookSchema.validate(req.body);
  if (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid book data for update" });
    return;
  }

  const bookIndex = DEMO_BOOKS.findIndex((b) => b.isbn === isbn);
  if (bookIndex === -1) {
    res.status(404).json({ success: false, message: "Book not found" });
    return;
  }

  const updatedBook = { ...DEMO_BOOKS[bookIndex], ...value };
  DEMO_BOOKS[bookIndex] = updatedBook;
  res.status(200).json({ success: true, book: updatedBook });
};

export const deleteBook: RequestHandler = (req, res) => {
  const { isbn } = req.params;
  const bookIndex = DEMO_BOOKS.findIndex((b) => b.isbn === isbn);
  if (bookIndex === -1) {
    res.status(404).json({ success: false, message: "Book not found" });
    return;
  }

  const deletedBook = DEMO_BOOKS.splice(bookIndex, 1)[0];
  res.status(200).json({ success: true, book: deletedBook });
};
