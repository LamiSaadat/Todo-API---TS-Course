"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodos = exports.editTodos = exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
//simplifying the setup with a function type rather than specifying the types of the params
const createTodo = (req, res, next) => {
    const text = req.body.text; //type casting
    const newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the todo", createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const editTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("could not find todo");
    }
    TODOS[todoIndex] = new todos_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated!", updatedText: TODOS[todoIndex] });
};
exports.editTodos = editTodos;
const deleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    TODOS.splice(todoIndex, 1);
    res.json({ message: "to do deleted" });
};
exports.deleteTodos = deleteTodos;
