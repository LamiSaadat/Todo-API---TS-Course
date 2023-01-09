//importing type and will be removed at compilation
import { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [];

//simplifying the setup with a function type rather than specifying the types of the params
export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text; //type casting
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const editTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("could not find todo");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: "Updated!", updatedText: TODOS[todoIndex] });
};

export const deleteTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  TODOS.splice(todoIndex, 1);

  res.json({ message: "to do deleted" });
};
