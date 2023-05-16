import React from "react";



const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  }

  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  }

  const login = () => {
    props.login({username: username, password: password});
    props.history.push("/");
  }

  return (
    <div className="w-1/2 mx-auto min-h-[100%]">
      <h1 className="align-center text-3xl mt-3 text-blue-400">Login</h1>
      <form className="mt-10 mb-10 p-2">
        <lable className="text-xl">Username</lable> <br />
        <input placeholder="Username" type="text" value={username} 
          onChange={onChangeUsername}
          className="focus:outline-none focus:border-blue-500 py-3 border-2 border-blue-500 rounded-xl px-5"
        />

        <hr className="mt-3 mb-3" />

        <lable>Password</lable> <br />
        <input placeholder="Password" type="password" value={password} 
          onChange={onChangePassword}
          className="focus:outline-none focus:border-blue-500 py-3 border-2 border-blue-500 rounded-xl px-5"
        />

        <hr className="mt-3 mb-3"/>
        <button className="border border-blue-500 bg-blue-500 text-white px-4 py-3 rounded-xl"
        onClick={login}>Login</button>
      </form> 
    </div>
  )
}

export default Login
