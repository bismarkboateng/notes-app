import { useState } from "react";
import TodoDataService from "../services/todos";
import { Link } from "react-router-dom";

const TodoObject = new TodoDataService();

const AddTodo = (props) => {

  let editing = false;
  let initialTodoTitle = "";
  let initialTodoMemo = "";

  if(props.location.state && props.location.state.currentTodo) {
    editing = true;
    initialTodoTitle = props.location.state.currentTodo.title;
    initialTodoMemo = props.location.state.currentTodo.memo;
  }


  const [title, setTitle] = useState(initialTodoTitle);
  const [memo, setMemo] = useState(initialTodoMemo);
  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = e => {
    const title = e.target.value;
    setTitle(title);
  }

  const onChangeMemo = e => {
    const memo = e.target.value;
    setMemo(memo);
  }

  const saveTodo = (props) => {
    let data = {
      title: title,
      memo: memo,
      completed: false
    }

    if (editing){
      TodoObject.updateTodo(props.location.state.currentTodo.id, data, props.token)
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
    else {

      TodoObject.createTodo(data, props.token)
        .then(response => {
          setSubmitted(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }


  return (
    <div className="w-1/2 mx-auto m-10">
      { submitted ? 
       (<div>
          <h4> Todo submitted Successfully!</h4>
          <Link to="/todos">Back to Todos</Link>
        </div>
       ) : 
       (<form>
          <label className="text-2xl">{ editing ? "Edit" : " Create" } 
           Todo </label> <br />
          <input 
            className="mt-3 focus:outline-none focus:border-blue-500 px-5 py-4 rounded-lg border-2 border-blue-500"
            type="text"
            required
            placeholder="e.g buy gift tomorrow"
            value={title}
            onChange={onChangeTitle}
          />
          <hr className="mt-3 mb-3"/>
          <label>Description</label> <br />
          <textarea
            className="mt-3 focus:outline-none focus:border-blue-500 border-2 rounded-lg px-10"
            rows={4}
            value={memo}
            onChange={onChangeMemo}
          /> <br />
          <button className="mt-4 bg-blue-500 text-white rounded-lg px-2 py-3">{ editing ? "Edit" : "Add" } Todo</button>
        </form>
       )
      }
    </div>
  )
}

export default AddTodo;