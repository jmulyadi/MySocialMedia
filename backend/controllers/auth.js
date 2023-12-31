import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//npm add bcryptjs to encrypt
//npm i jsonwebtoken cookie-parser cors
export const register = (req, res) =>{
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) =>{
        if(err) res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists")
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES(?)"
        const values = [req.body.username, req.body.email, hashedPassword,req.body.name]
        db.query(q, [values], (err, data)=>{
            if(err) res.status(500).json(err)
            return res.status(200).json("user has been created")
        })
    })


}
export const login = (req, res) =>{
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) =>{
        if(err) res.status(500).json(err)
        if(data.length === 0) return res.status(409).json("User not Found")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json('Wrong Password')

        const token = jwt.sign({id:data[0].id}, "secretkey");
        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
        
    })
}
export const logout = (req, res) =>{
    
}