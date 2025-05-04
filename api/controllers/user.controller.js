import userService from '../services/user.services.js';

const register = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ code: 'Register_Bad_Request', message: 'Username, password and email required' });
    }

    try {
        if (!isValidEmail(req.body.email)) {
            return res.status(400).json({ code: 'Register_Invalid_Email', message: 'Invalid email format' });
        }
        
        if (!isValidPassword(req.body.password)) {
            return res.status(400).json({ code: 'Register_Invalid_Password', message: 'Password must be at least 8 characters with uppercase, lowercase, and number' });
        }

        const savedUser = await userService.registerUser(req.body);
        return res.status(200).json({ code: 'Register_Successful', message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ code: 'Register_Repeated_Email', message: 'Email already exists' });
        }
        return res.status(500).json({ code: 'Register_Error', message: 'Error saving user' });
    }
};

const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        
        if (result.code === 'Login_Successful') {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            code: 'Login_Error', 
            message: 'Internal server error' 
        });
    }
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}


export default { register, login };
