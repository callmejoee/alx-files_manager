import crypto from 'crypto';
import dbClient from '../utils/db.js';

class UsersController {
    // Handle POST /users
    static async postNew(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email) {
                return res.status(400).json({ error: 'Missing email' });
            }
            if (!password) {
                return res.status(400).json({ error: 'Missing password' });
            }

            const usersCollection = dbClient.db.collection('users');

            // Check if the email already exists
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Already exist' });
            }

            // Hash the password using SHA1
            const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

            // Create new user
            const result = await usersCollection.insertOne({ email, password: hashedPassword });

            // Respond with the new user data
            const newUser = result.ops[0];
            res.status(201).json({ id: newUser._id.toString(), email: newUser.email });
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UsersController;
