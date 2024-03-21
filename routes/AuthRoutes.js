
import express from "express";
import { logout } from "../controllers/AuthConttrollers.js";
import { login } from "../controllers/AuthConttrollers.js";
import { signup } from "../controllers/AuthConttrollers.js";


const AuthRoutes = express.Router()


AuthRoutes.post("/login", login)
AuthRoutes.post("/signup", signup)
AuthRoutes.post("/logout", logout)


export default AuthRoutes