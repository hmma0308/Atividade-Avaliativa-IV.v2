import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    const existingUser = await db.users.findOne({ email });
    if (existingUser) {
        throw { code: 11000 };
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await db.users.create({
        username,
        password: hashedPassword,
        email
    });
};

const login = async (credentials) => {
    const user = await db.users.findOne({ username: credentials.username });

    if (!user) return { code: 'Login_Bad_Email', message: 'User not found' };
    
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return { code: 'Login_Bad_Password', message: 'Invalid password' };

    const token = jwt.sign({ id: db.users._id }, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
    });
    
    return { 
        code: 'Login_Successful', 
        message: 'Login successful', 
        token 
    };
};

export default { registerUser, login };
