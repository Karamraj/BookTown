const userModel = require('../models/userModel');
const passwordModel = require('../models/userPasswordModel');
const userTokenModel = require('../models/userTokenModel');
const otpModel = require('../models/otpModel');
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
                    console.log("user:"+createUser);
                    
                    const createPassword = await passwordModel.create({userId : createUser._id, salt: passwordSalt, passwordHash: passwordHash});

                    if(createPassword._id) {
                        console.log("createPass:"+createPassword);
                        const token = await helper.generateToken(createUser._id);
                        const tokenSaved : any = await saveTokentoDb(token, createUser._id)
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

export async function userProfile(token : String) {
    try {
        const validateToken = await helper.validateToken(token);

        if(validateToken) {
            const userToken = await userTokenModel.findOne({token:token});
            if(userToken._id) {
             
                const userId = userToken.userId;
                const userData = await userModel.findOne({_id: userId})
                if(userData._id) {
                    return userData
                }
                else {
                    return {"message":"No user found"};
                }
            }
            else {
                return {"message":"Invalid token"};
            }
        }
        else {
            return {"message":"Invalid token from jwt"};
        }
     } catch (err){
        return {"message":err.message}
     }
}

export async function updatePhone(token : String, phone : string){
    try {
        const validateToken = await validateAndReturnUser(token);

        if(validateToken._id) {
    
            const phoneUpdate = await userModel.updateOne({_id: validateToken._id}, {$set: {phone: phone}})
            console.log(phoneUpdate);
            if(phoneUpdate.modifiedCount >= 0) {
                return {"message":"Phone updated successfully", modifiedCount : phoneUpdate.modifiedCount};
            }
            else {
                return {"message":"Error updating phone"};
            } 
        }
        else {
            return {"message":"Invalid token"};
        }
     } catch (err){
        return {"message":err.message}
     }
}

export async function updateAddress(token : String, street : string, pincode: string, state : string, country : string){
    try {
        const validateToken = await validateAndReturnUser(token);

        if(validateToken._id) {
    
            const addressUpdate = await userModel.updateOne({_id: validateToken._id}, 
                {$set: {streetAddress: street, country: country, state: state, pincode: pincode}})
            if(addressUpdate.modifiedCount >= 0) {
                return {"message":"Address updated successfully", modifiedCount : addressUpdate.modifiedCount};
            }
            else {
                return {"message":"Error updating address"};
            } 
        }
        else {
            return {"message":"Invalid token"};
        }
     } catch (err){
        return {"message":err.message}
     }
}

export async function validateAndReturnUser(token: String) {
     try {
        const validateToken = await helper.validateToken(token);

        if(validateToken) {
            const userToken = await userTokenModel.findOne({token:token});
            if(userToken._id) {
             
                const userId = userToken.userId;
                const userData = await userModel.findOne({_id: userId})
                if(userData._id) {
                    return userData
                }
                else {
                    return {"message":"No user found"};
                }
            }
            else {
                return {"message":"Invalid token"};
            }
        }
        else {
            return {"message":"Invalid token from jwt"};
        }
     } catch (err){
        return {"message":err.message}
     }
}

export async function forgotPassword(email: String) {
    try {
       const _userExists = await userExists(email)

       if(_userExists) {
        const otp = await helper.generateRandomNumber(6);

        const saveOTP = await otpModel.create({email : email, otp: otp, createdAt: new Date()});
        if(saveOTP._id) {
            return saveOTP;
        }
        else {
            return {"message":"Error sending otp"}
        }
       }
       else {
           return {"message":"Invalid token"};
       }
    } catch (err){
       return {"message":err.message}
    }
}

export async function verifyOTP(email: String, otp : string) {
    try {
       const _userExists = await userExists(email)

       if(_userExists) {
        const otpCheck = await otpModel.findOne({otp: otp})
        if(otpCheck !=null) {
            const currentTime = new Date().getTime();
            const loadTime = otpCheck.createdAt;
            const difference = currentTime - loadTime;
            
            if (difference > 600000) {
                console.log("5 minutes have passed.");
                await otpModel.deleteOne({otp:otp})
                return {"message":"OTP Expired"}
              } 
              else {
                await otpModel.deleteOne({otp:otp})
                console.log("5 minutes have not passed.");
                return otpCheck
              }
       }
       else {
        return {"message":"Invalid OTP"};
       }
    }
       else {
           return {"message":"Invalid user"};
       }
    } catch (err){
       return {"message":err.message}
    }
}

export async function resetPassword(email, password: string) {
    try {
        const userExists = await userModel.findOne({email : email})
        console.log(userExists);
        if(userExists) {
            const passwordData = await helper.hashPassword(password);
            if(passwordData.hash) {
                const passwordHash = passwordData.hash;
                const passwordSalt = passwordData.salt;
                    const createPassword = await passwordModel.updateOne(
                        {userId : userExists._id},{ $set: {salt : passwordSalt, passwordHash: passwordHash }});
                    if(createPassword.modifiedCount >= 0) {
                        console.log("createPass:"+createPassword);
                        return userExists;
                    
                    }
                    else {
                        return {"message":"Error saving password to database"}
                    }
                }
                else {
                    return {"message":"Unknown error when creating password"}
                }
            }
            else {
                return {"message":"No user exists"}
            }

       
     } catch (err){
        return {"message":err.message}
     }   
}