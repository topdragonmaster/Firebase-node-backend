const { getApps, initializeApp } = require('firebase/app');
const dotenv = require('dotenv');
const {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  getDocs
} = require("firebase/firestore");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NODE_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NODE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NODE_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NODE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NODE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NODE_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp


if (!getApps().length) {
  console.log("Started Firebase app");
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore(firebaseApp);

class Firebase {

  static async getAllTodoList(req, res) {
    const { uid } = req.query;
    const docsQuery = query(
      collection(db, "users/" + uid + "/todos"),
      orderBy("createdDate"),
      limit(50)
    );

    const querySnapshot = await getDocs(docsQuery)
    const todos = []
    querySnapshot.forEach((doc) => {
      const newTodo = doc.data();
      newTodo.id = doc.id;
      todos.push(newTodo);
    });

    res
      .status(200)
      .send({ todos: todos })
  }

  static async createTodo(req, res) {
    const { uid, id, title, description, createdDate } = req.body;
    const todo = { id, title, description, createdDate };
    console.log(todo)
    addDoc(collection(db, "users/" + uid + "/todos"), todo)
      .then(() => {
        res.send({ status: 200, message: "Todo is successfully added" })
      });
  }

  static async updateTodo(req, res) {
    const { uid, id, title, description, createdDate } = req.body;
    const todo = { id, title, description, createdDate };
    console.log(todo)
    setDoc(doc(db, "users/" + uid + "/todos", todo.id), todo)
      .then(() => {
        res.send({ status: 200, message: "Todo is successfully updated" })
      });
  }

  static async deleteTodo(req, res) {
    const { uid, id } = req.body;
    deleteDoc(doc(db, "users/" + uid + "/todos", id))
      .then(() => {
        res.send({ status: 200, message: "Todo is successfully deleted" })
      });
  }

}


module.exports = Firebase