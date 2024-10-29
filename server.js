require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session'); // To manage user sessions

// const app = express();
// const PORT = 5000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/miniproject')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


// Define a schema for the user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,

});

// Create a model for the user
const User = mongoose.model('User', userSchema);






// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static HTML
app.use(session({
    secret: 'secret', // Use a secure, strong secret in production
    resave: false,
    saveUninitialized: true
}));

// Routes
app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/public/index.html'); // If logged in, show the index page
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name: name });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare passwords
        if (user.password === password) {
            req.session.user = user; // Save user info in session
            return res.redirect('/option.html'); // Redirect to home or dashboard
        } else {
            return res.status(401).send('Incorrect password');
        }
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error occurred: database error');
    }
});










app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});





app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/login?success=true'); // Redirect to login page with success message
    } catch (err) {
        console.error(err); // Log the error
        res.status(400).send('Error creating user');
    }
});


// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Error occurred during logout');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: 'Logout successful' }); // Respond with a JSON message
    });
});

// Route to get logged-in user's information
app.get('/getUser', (req, res) => {
    if (req.session.user) {
        res.json({ username: req.session.user.name });
    } else {
        res.status(401).json({ message: 'User not logged in' });
    }
});

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
