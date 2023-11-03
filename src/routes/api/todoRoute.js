const { Router } = require('express');
const todoController =  require('../../controllers/todoController.js');

const todoRoute = Router();

todoRoute.post(
  '/createtodo',
  todoController.createTodo
);

todoRoute.get(
  '/getAllTodoList',
  todoController.getAllTodoList
);

todoRoute.put(
    '/updateTodo',
    todoController.updateTodo
);
    
todoRoute.delete(
    '/deleteTodo',
    todoController.deleteTodo
);


module.exports =  todoRoute;
