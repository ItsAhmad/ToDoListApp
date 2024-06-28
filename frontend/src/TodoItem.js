const TodoItem = (props) => {
  return (
    <li>{props.task} <button onClick={() => props.onDeleteClick(props.id)}>Delete</button></li>
  );
};

export default TodoItem;