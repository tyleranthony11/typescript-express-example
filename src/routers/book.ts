import { Router } from "express";
import * as BookController from "../controllers/book";

const router = Router();

router.post("/", BookController.createBook);
router.get("/:isbn", BookController.getBook);
router.put("/:isbn", BookController.updateBook);
router.delete("/:isbn", BookController.deleteBook);

export default router;
