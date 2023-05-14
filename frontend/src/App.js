import { Switch, Route, Link } from "react-router-dom";
import { AddTodo, Signup, Login  } from "./components";
import NavBar from "./components/NavBar";


const App = () => {
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
