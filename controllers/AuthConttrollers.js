import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const secretKey = 'your_secret_key';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Construct the file path to users.json
const usersFilePath = path.join(__dirname, '../users.json');
// Read the users data from users.json
const usersData = fs.readFileSync(usersFilePath, 'utf-8');
// Parse the JSON data
const users = JSON.parse(usersData);



// ************************************signup*****************************
export const signup = (req, res) => {
    const { username, password } = req.body;
    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Add new user
    const newUser = { userId: Date.now(), username, password: hash };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));

    res.status(201).json({ message: 'User created successfully' });
}


// ********************************Login start************************************
export const login = (req, res) => {

    const { username, password } = req.body;
    // Check if user exists and credentials are correct
    const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password));
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.userId, username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
};


// *********************************Logout start*********************************************
export const logout = (req, res) => {
    const token = ""
    res.json({ token });
}