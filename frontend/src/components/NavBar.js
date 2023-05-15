import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [loginState, setLoginState] = useState(false)

  return (
    <div 
      className="w-full mx-auto bg-blue-700 text-white rounded-xl py-3 px-5 mt-2 font-semibold
      flex flex-row justify-around"
    >
        <div className="uppercase">
            Todo App
        </div>
        <ul className="px-2">
            <Link to="/todos" className="px-2">Todos</Link>
            { loginState 
              ? ( <Link to="/logout" className="px-2">Logout</Link>)
              : (
                <>
                  <Link to="/Login" className="px-2">Login</Link>
                  <Link to="/signup" className="px-2">signup</Link>
                </>
              )
            }  
        </ul>
    </div>
  )
}

export default NavBar;