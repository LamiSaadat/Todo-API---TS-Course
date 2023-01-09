import { Router } from "express";

import {
  createTodo,
  getTodos,
  editTodos,
  deleteTodos,
} from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.patch("/:id", editTodos);

router.delete("/:id", deleteTodos);

export default router;
