import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { currentUser, login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const [err, setErr] = useState(null);
  //function is important right here
  //it is constanly updated input with the new stuff when it changes
  //it cheeps the all stuff with ...prev and only updates the current name
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
        await login(inputs);
        navigate("/")
    }catch(err){
        setErr(err.response.data)
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Socially</h1>
          <p>
            This is just some formal text and stuff that you should read before
            you login
          </p>
          <span>Don't have an account</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name = "username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
