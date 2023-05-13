import { Switch, Routes, Link } from "react-router-dom";
import { AddTodo, Navbar, Login, Signup, TodoList } from "./components";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="signup/" element={<Signup />} />
        <Route path="login/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
