import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { jwtConfig } from '../config/db.config.js';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    const existingUser = await db.users.findOne({ 
        where: { email } 
    });
    if (existingUser) {
        throw { 
            code: 'Register_Repeated_Email', 
            message: 'Email already exists' 
        };
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
    try {
        const user = await db.users.findOne({ 
            where: { 
              username: credentials.username 
            } 
          });

        if (!user) return { code: 'Login_Bad_Email', message: 'User not found' };
        
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) return { code: 'Login_Bad_Password', message: 'Invalid password' };

        // Updated JWT signing part:
        const token = jwt.sign(
            { id: user.id }, 
            jwtConfig.secret, 
            { expiresIn: jwtConfig.expiresIn }
        );

        return { 
            code: 'Login_Successful', 
            message: 'Login successful', 
            token 
        };
    } catch (error) {
        console.error("Login service error:", error);
        throw error;
    }

};

export default { registerUser, login };
