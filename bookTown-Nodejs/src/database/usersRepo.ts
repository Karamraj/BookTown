const userModel = require('../models/userModel');
const passwordModel = require('../models/userPasswordModel');
const userTokenModel = require('../models/userTokenModel');
import * as helper from '../utils/authHelper';
export async function userExists(email) {
    try {
       const userExists = await userModel.findOne({email: email})

       if(userExists._id) {
        return true
       }
       else {
        return false
       }
    } catch (err){
        return false
    }

}

export async function tryLogin(email, password) {
    try {
        const userExists = await userModel.findOne({email: email})

        if(userExists._id) {
            const passwordData = await passwordModel.findOne({userId: userExists._id})
            const passwordHash = passwordData.passwordHash;
            const salt = passwordData.salt;
            const checkPassword = await helper.isPasswordCorrect(passwordHash, salt, password)
            if(checkPassword) {
                const token = await helper.generateToken(userExists._id);
                const tokenSaved : any = await saveTokentoDb(token, userExists._id)
                if(tokenSaved.token) {
                    return {userExists, "token": token};
                }
                else {
                    console.log('Token not saved');
                }
            }
            else {
                return {"message": "Incorrect password or email"}
            }
        }

       
     } catch (err){
         return {"message":err.message}
     }
}

export async function signUpUser(fullname,email, password) {
    try {
        const userExists = await userModel.findOne({email : email})
        console.log(userExists);
        if(!userExists) {
            console.log('doesnt exist');
            const passwordData = await helper.hashPassword(password);
            if(passwordData.hash) {
                const passwordHash = passwordData.hash;
                const passwordSalt = passwordData.salt;
                const createUser = await userModel.create({fullname : fullname, email : email});
              
                if(createUser._id) {
                    console.log(createUser);
                    
                    const createPassword = await passwordModel.create({userId : createUser._id, salt: passwordSalt, passwordHash: passwordHash});

                    if(createPassword._id) {
                        const token = await helper.generateToken(userExists._id);
                        const tokenSaved : any = await saveTokentoDb(token, userExists._id)
                        if(tokenSaved.token) {
                            return {createUser, "token": token};
                        }
                        else {
                            console.log('Token not saved');
                        }

                    }
                    else {
                        return {"message":"Error saving password to database"}
                    }
                }
                else {
                    return {"message":"Unknown error when creating user in database"}
                }
            }
            else {
                return {"message":"Error generating password"}
            }
        }
        else {
            return {"message":"A user already exists with this email."}
        }

       
     } catch (err){
        return {"message":err.message}
     }
}

export const saveTokentoDb = async (token, userId) => {
    const token_ = await userTokenModel.create({userId: userId, token: token});
    return token_;
}