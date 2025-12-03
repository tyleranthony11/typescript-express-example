import * as BookController from "../../src/controllers/book";
import { Request, Response } from "express";
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
const mockRequest = (body: any, params: any = {}) => {
  return {
    body: body,
    params: params,
  } as unknown as Request;
};
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
const mockResponse = () => {
  let res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockReturnValue(res);
  res.json.mockReturnValue(res);
  return res as unknown as Response;
};
<<<<<<< HEAD
 
// POST Tests
 
=======

// POST Tests

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
describe("createBook", () => {
  beforeEach(() => {
    (BookController as any).DEMO_BOOKS.length = 0;
    jest.clearAllMocks();
  });
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
  it("should create a book and return 200", () => {
    let req = mockRequest({
      isbn: "123-45-67890-12-3",
      title: "Test Book",
      author: "Test Author",
      year: 2025,
      publisher: "Test Publisher",
    });
    let res = mockResponse();
    const next = jest.fn();
    BookController.createBook(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      book: {
        isbn: "123-45-67890-12-3",
        title: "Test Book",
        author: "Test Author",
        year: 2025,
        publisher: "Test Publisher",
      },
    });
  });
  it("should not create a book and return 400 if missing required fields", () => {
    let req = mockRequest({
      isbn: "123-45-67890-12-3",
      author: "Test Author",
      year: 2025,
      publisher: "Test Publisher",
    });
    let res = mockResponse();
    const next = jest.fn();
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    BookController.createBook(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenLastCalledWith({
      success: false,
      message: "Invalid book data",
    });
  });
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
  it("should return 400 if the book already exists", () => {
    const book = {
      isbn: "111-22-33333-44-5",
      title: "Existing Book",
      author: "Author",
      year: 2010,
      publisher: "Publisher",
    };
<<<<<<< HEAD
 
    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());
 
    const req = mockRequest(book);
    const res = mockResponse();
    const next = jest.fn();
 
    BookController.createBook(req, res, next);
 
=======

    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());

    const req = mockRequest(book);
    const res = mockResponse();
    const next = jest.fn();

    BookController.createBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Book with this ISBN already exists",
    });
  });
});
<<<<<<< HEAD
 
// GET Tests
 
=======

// GET Tests

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
describe("getBook", () => {
  it("should return the book if it exists", () => {
    const book = {
      isbn: "987-65-43210-98-7",
      title: "Get Book Test",
      author: "Author",
      year: 2015,
      publisher: "Publisher",
    };
<<<<<<< HEAD
 
    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());
 
    const req = mockRequest({}, { isbn: "987-65-43210-98-7" });
    const res = mockResponse();
    const next = jest.fn();
 
    BookController.getBook(req, res, next);
 
=======

    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());

    const req = mockRequest({}, { isbn: "987-65-43210-98-7" });
    const res = mockResponse();
    const next = jest.fn();

    BookController.getBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      book,
    });
  });
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
  it("should return 404 if the book does not exists", () => {
    const req = mockRequest({}, { isbn: "000-00-00000-00-0" });
    const res = mockResponse();
    const next = jest.fn();
<<<<<<< HEAD
 
    BookController.getBook(req, res, next);
 
=======

    BookController.getBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Book not found",
    });
  });
});
<<<<<<< HEAD
 
// PUT Tests
 
=======

// PUT Tests

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
describe("updateBook", () => {
  it("should update the book and return 200", () => {
    const book = {
      isbn: "999-88-77777-66-5",
      title: "Original Title",
      author: "Author",
      year: 2020,
      publisher: "Publisher",
    };
    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    const req = mockRequest(
      { title: "Updated Title" },
      { isbn: "999-88-77777-66-5" }
    );
    const res = mockResponse();
    const next = jest.fn();
<<<<<<< HEAD
 
    BookController.updateBook(req, res, next);
 
=======

    BookController.updateBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      book: { ...book, title: "Updated Title" },
    });
  });
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
  it("should return 400 if update body is invalid", () => {
    const book = {
      isbn: "111-00-11111-00-1",
      title: "Valid Book",
      author: "Author",
      year: 2022,
      publisher: "Publisher",
    };
    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    const req = mockRequest(
      { year: "not-a-number" },
      { isbn: "111-00-11111-00-1" }
    );
    const res = mockResponse();
    const next = jest.fn();
<<<<<<< HEAD
 
    BookController.updateBook(req, res, next);
 
=======

    BookController.updateBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid book data for update",
    });
  });
});
<<<<<<< HEAD
 
// DELETE Tests
 
=======

// DELETE Tests

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
describe("deleteBook", () => {
  it("should delete book and return 200", () => {
    const book = {
      isbn: "555-66-77777-44-3",
      title: "Delete Test",
      author: "Author",
      year: 2023,
      publisher: "Publisher",
    };
    BookController.createBook(mockRequest(book), mockResponse(), jest.fn());
<<<<<<< HEAD
 
    const req = mockRequest({}, { isbn: "555-66-77777-44-3" });
    const res = mockResponse();
    const next = jest.fn();
 
    BookController.deleteBook(req, res, next);
 
=======

    const req = mockRequest({}, { isbn: "555-66-77777-44-3" });
    const res = mockResponse();
    const next = jest.fn();

    BookController.deleteBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      book,
    });
  });
<<<<<<< HEAD
 
=======

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
  it("should return 404 if the book does not exist", () => {
    const req = mockRequest({}, { isbn: "000-00-00000-00-0" });
    const res = mockResponse();
    const next = jest.fn();
<<<<<<< HEAD
 
    BookController.deleteBook(req, res, next);
 
=======

    BookController.deleteBook(req, res, next);

>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Book not found",
    });
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> e0c3d987ac1be0ea0267e7ba5f4bef039ce92ebe
