import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw { code: 11000 };
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await User.create({
        username,
        password: hashedPassword,
        email
    });
};

const login = async (credentials) => {
    const user = await User.findOne({ username: credentials.username })
        .select('+password')
        .maxTimeMS(5000);

    if (!user) return { code: 'Login_Bad_Email', message: 'User not found' };
    
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) return { code: 'Login_Bad_Password', message: 'Invalid password' };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
        expiresIn: '1h' 
    });
    
    return { 
        code: 'Login_Successful', 
        message: 'Login successful', 
        token 
    };
};

export default { registerUser, login };
