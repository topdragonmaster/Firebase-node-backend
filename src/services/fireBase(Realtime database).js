const firebase =  require('firebase-admin');
const serviceAccount =  require('../service-account-file.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://todoapp-642a1-default-rtdb.firebaseio.com/',
});

var db = firebase.database();
var todoRef = db.ref('todolist');

// This class is used to store the data to the Realtime database. 
// But in our server, we don't use this feature.
class Firebase {
  // CREATE - create todo
  static async createTodo(req, res) {
    const { name } = req.body;

    const data = { name, completed: false};

    // Push the data to the databse
    todoRef.push(data, function (err) {
      if (err) {
        res
          .send({ status: 500, message: 'Internal server error!' });
          return;
      } else {
        res
          .send({ status: 201, message: 'New todo created successfully!' });
      }
    });
  }

  static async getAllTodoList(req, res) {

    todoRef.once('value',  (data) =>  {
      var list = [];
      data.forEach(function (elem) {
        list.push({id: elem.key , ...elem.val()});
      })
      res
        .status(201)
        .send({todolist: list})
    }, (error) => {
      res
        .status(500)
        .send({ message: error.name });
    });
    return;
  }

  static async updateTodo(req, res) {
    const { completed } = req.body;
    const {
      params: { id },
    } = req;

    todoRef.child(id).update({ completed }, (err) => {
      if(err) {
        res.send(err)
      } else {
        todoRef.once('value', (snapshot) => {
          if(snapshot.val() == null) {
            res.status(404).send({status: 404, error: 'Todo item not found'});
          } else {
            res.send({
              status: 201,
              message: 'Todo updated successfully.',
              data: snapshot
            })
          }
        })
      }
    });
  }

  static async deleteTodo(req, res) {
    const {
      params: { id }
    } = req;

    todoRef.child(id).remove((err) => {
      if(err) {
        res.send(err);
      } else {
        res
          .status(201)
          .send({status: 201, message: "Todo deleted successfully."});
      }
    });
  }
}

module.exports = Firebase;
