import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const onDeleteClick = (id) => {
    // make the POST request to the backend
    fetch(`/todos/${id}/delete`, { method: 'POST' })
      .then((response) => {
        // check if the POST request resolved successfully
        if (response.ok) {
          // filter the todos array to remove the todo with the provided `id`
          const filteredTodos = todos.filter(todo => todo.id !== id);
  
          // set state with the new array
          return setTodos(filteredTodos);
        }
  
        // if the response is not ok, something has gone wrong while trying to delete the todo
        throw new Error('Error deleting todo');
      });  
  };

  const todoItemComponentsArr = todos.map((todo) => {
    return (
      <TodoItem  
        key={todo.id}
        id={todo.id} 
        task={todo.task} 
        onDeleteClick={onDeleteClick} 
      />
    );


  });

  return (
    <div className="App">
      <ul>
        {todoItemComponentsArr}
      </ul>
    </div>
  );
}

export default App;