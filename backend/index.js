// Server
const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');

const port = 8080;
const app = express();

app.use(morgan('dev'));
app.use(cors()); // allow requests from any domain

const todoData = {
  abc: {id: 'abc', task: 'buy milk', done: false},
  def: {id: 'def', task: 'wash dishes', done: false},
  ghi: {id: 'ghi', task: 'clean up', done: true},
};

// GET /todos => respond with all todos as JSON
app.get("/todos", (req, res) => {
  // create an array from the todoData object
  const data = Object.values(todoData);

  res.json(data);
});

// DELETE /todos => delete the todo associated with the provided id
app.post("/todos/:id/delete", (req, res) => {
  const todoId = req.params.id;
  delete todoData[todoId];

  // respond with a generic success message to let the browser know the request succeeded
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});