import express from 'express';
import routes from './routes/index.js';
import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';

// Create an Express app
const app = express();
const router = express.Router();


// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Use routes defined in routes/index.js
app.use('/', routes);
// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);

export default router;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
