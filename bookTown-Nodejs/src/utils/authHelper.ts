require('dotenv').config()
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

var iterations = 10000;
let jwtSecretKey = process.env.JWT_SECRET_KEY; 

export const hashPassword = async (password) => {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash= crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');


    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

export async function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
    return savedHash == crypto.pbkdf2Sync(passwordAttempt, savedSalt, iterations, 64, 'sha512').toString('hex');
}

export var generateRandomNumber = function (length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }

export function generateToken(userId) {
    let data = { 
        time: Date(), 
        userId: userId, 
    } 
  
    const token = jwt.sign(data, jwtSecretKey); 

    return token;

} 

export function validateToken(token: String) {
    const valid = jwt.verify(token, jwtSecretKey);

    return valid;
}