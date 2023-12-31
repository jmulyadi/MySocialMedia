import "./register.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:"",
    })
    const [err, setErr] = useState(null);
    //function is important right here
    //it is constanly updated input with the new stuff when it changes
    //it cheeps the all stuff with ...prev and only updates the current name
    const handleChange = (e) =>{
        setInputs((prev)=>({...prev, [e.target.name] : e.target.value}))
    }
    // has to async when making api request
    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/api/auth/register", inputs)
            
        }catch(err){
            setErr(err.response.data);
        }
        
    }

    return(
        <div className = "register">
            <div className = "card">
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder = "Username" name = "username" onChange = {handleChange}/>
                        <input type="email" placeholder = "Email" name = "email" onChange = {handleChange}/>
                        <input type="password" placeholder = "Password" name = "password" onChange = {handleChange}/>
                        <input type="text" placeholder = "Name" name = "name" onChange = {handleChange}/>
                        {err && err} 
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
                <div className="left">
                    <h1>Socially</h1>
                        <p>
                            This is just some formal text and 
                            stuff that you should read before you login
                        </p>
                    <span>Do you have an account</span>
                    <Link to = "/login"><button>Login</button></Link>
                    
                </div>
            </div>
        </div>
    )
}

export default Register