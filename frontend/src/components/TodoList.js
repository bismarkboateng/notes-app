import React from "react";
import TodoDataService from "../services/todos";
import { Link } from "react-router-dom";
import moment from "moment";

const Todos = new TodoDataService();


const TodoList = (props) => {
  const [todos, setTodo] = React.useState([]);

  React.useEffect(() => {
    retrieveTodos();
  },[props.token]);

  const retrieveTodos = () => {
    Todos.getAll(props.token)
      .then(response => {
        setTodo(response.data);
      })
      .catch( e => {
        console.log(e);
      });
  }

  return (
    <div className="m-10">
      { props.token === null || props.token === ""
      ? (<div className="bg-red-100 p-10 rounded text-red-500"> You are not Logged in: Please <Link to="/login">login </Link>to see your todos</div>)
      : ( 
        <div>
          <Link to={"/todos/create"}>
            <button className="mb-3 bg-white-400 text-blue-300 border border-blue-400 px-1 py-2 rounded-lg">Add Todo</button>
          </Link>
          { todos.map((todo) => (
            <div className="p-2">
              <div key={todo.id}>
                <h1>{ todo.title }</h1>
                <strong>Memo: </strong> <span>{ todo.memo }</span>
              
                <p>Date created: { moment(todo.created_at).format("Do MMMM YYYY")}  </p>
                <div className="mt-2">
                  <Link to={{ pathname: "/todos/" + todo.id, state: { currentTodo: todo }}} className="mr-3">
                    <button className="bg-blue-500 text-white px-5 py-1 rounded">Edit</button>
                  </Link>
                  <button className="bg-red-500 text-white px-5 py-1 rounded" >Delete</button>
                  <hr className="mt-3 mb-3" />
                </div>
              </div>  
            </div>
          ))}
        </div>
      )
    }
    </div>
  )
}

export default TodoList;
