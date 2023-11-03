const Firebase =  require('../services/fireBase');

class todoController {
  static async createTodo(req, res) {
    Firebase.createTodo(req, res);
  }

  static async getAllTodoList(req, res) {
    Firebase.getAllTodoList(req, res);
  }

  static async updateTodo(req, res) {
    Firebase.updateTodo(req, res);
  }

  static async deleteTodo(req, res) {
    Firebase.deleteTodo(req, res)
  }
}

module.exports =  todoController;
