import { Switch, Route, Link } from "react-router-dom";
import { AddTodo, Signup, Login, TodoList  } from "./components";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import React from "react";
import TodoDataService from "./services/todos";

const TodoService = new TodoDataService();

const App = () => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState("");


  const login = async (user = null) => {
    TodoService.logging(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
        setError("");
      })
      .catch(e => {
        console.log("login", e);
         setError(e.toString());
      })
  }

  const logout = async () => {
    setToken("");
    setUser("");
    // simply flushing away the current token and logged in user
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  }

  // default user to null
  const signup = async (user = null) => {
    TodoService.signup(user)
      .then(response => {
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", user.username);
      })
      .catch( e => {
        console.log(e);
        setError(e.toString());
      })
  }


  return (
    <div className="w-2/3 mx-auto">
      <NavBar logout={logout} user={user} />
      <Switch>
        <Route exact path={["/", "/todos"]} render={(props)=> <TodoList {...props} token={token} />} />
        <Route exact path="/todos/create" render={(props)=> <AddTodo {...props} token={token} />} />
        <Route exact path="/todos/:id/" render={(props)=> <AddTodo {...props} token={token} />} />
        <Route exact path="/login" render={(props)=> <Login {...props} login={login} />} />
        <Route exact path="/signup" render={(props)=> <Signup {...props} signup={signup} />} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
