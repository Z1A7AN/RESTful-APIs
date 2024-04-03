import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to fetch users from the public API
app.get('/users', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch posts for a specific user
app.get('/users/:userId/posts', async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});