import { Switch, Route, Link } from "react-router-dom";
import { AddTodo, Signup, Login  } from "./components";
import NavBar from "./components/NavBar";
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

  const singup = async (user = null) => {
    setUser(user);
  }


  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="signup/" element={<Signup />} />
        <Route path="login/" element={<Login />} />
      </Switch>
    </div>
  )
}

export default App
