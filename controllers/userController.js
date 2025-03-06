import { users } from '../models/user.js';
import crypto from 'crypto';

const signup = (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    email,
    password, // In real app, hash this
    createdAt: new Date()
  };

  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', userId: newUser.id });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', userId: user.id });
};

export { signup, login }; 