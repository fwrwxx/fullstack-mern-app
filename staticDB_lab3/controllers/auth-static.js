import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../static-db.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, location, occupation } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingUser = await db.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await db.createUser({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: picturePath || "",
            location: location || "",
            occupation: occupation || ""
        });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '24h' }
        );

        const userResponse = { ...newUser };
        delete userResponse.password;

        res.status(201).json({
            token,
            user: userResponse,
            message: "User registered successfully"
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN USER */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await db.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '24h' }
        );

        const userResponse = { ...user };
        delete userResponse.password;

        res.status(200).json({
            token,
            user: userResponse,
            message: "Login successful"
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
};