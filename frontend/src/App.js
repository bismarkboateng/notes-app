import { Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddTodo, Login, Signup, TodoList } from "./components";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
        <Navbar.Brand>React-bootstrap</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Todos</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        </div>
      </Navbar>
    </div>
  )
}

export default App
