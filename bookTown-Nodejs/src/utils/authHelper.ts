import * as bcrypt from 'bcrypt';

export const password = {
    encryptPassword: (password: string) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),
    
    checkPassword: (password: string, hashPassword: string) =>
        bcrypt.compare(password, hashPassword)
        .then(resp => resp)
    
    }

export var generateRandomNumber = function (length) {
        return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
    }