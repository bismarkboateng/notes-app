import { Switch, Route, Link } from "react-router-dom";
import { AddTodo, Signup, Login, TodoList  } from "./components";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import React from "react";


const App = () => {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState("");


  const login = async (user = null) => {
    setUser(user);
  }

  const logout = async () => {
    setUser(null);
  }

  // default user to null
  const signup = async (user = null) => {
    setUser(user);
  }


  return (
    <div className="w-2/3 mx-auto">
      <NavBar />
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
