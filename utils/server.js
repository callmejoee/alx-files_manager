import express from 'express';
import routes from './routes/index.js';

// Create an Express app
const app = express();

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Use routes defined in routes/index.js
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
