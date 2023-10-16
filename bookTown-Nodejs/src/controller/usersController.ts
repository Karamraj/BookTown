import * as userRepo from '../database/usersRepo';

export async function loginUser(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userExists = await userRepo.userExists(email);

        if(userExists) {
            const loginSuccess : any = await userRepo.tryLogin(email, password);

            if(loginSuccess._id) {
                res.status(200).send({"message": "login Successful", "result": loginSuccess});
            }
            else {
                res.status(401).send(loginSuccess);
            }
        }
        else {
            res.status(401).send({"message": "There is no such account with this email"});
        }

    } catch (err){
        res.status(403).send({"message": err.message});
    }
}

export async function signUpUser(req, res) {
    try {
        const fullname = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        const userExists = await userRepo.userExists(email);

        if(!userExists) {
            if(password.length < 6) {
                res.status(403).send({"message": "Please enter a password with at least 6 characters"});
            }
            else {
               const createUser : any = await userRepo.signUpUser(fullname, email, password);

                if(createUser._id) {
                    res.status(200).send({"message": "Signup Successfully", "result": createUser});
                }
                else {
                    res.status(403).send(createUser);
                }
            }
        }
        else {
            res.status(401).send({"message": "This email is already in use"});
        }

    } catch (err){
        res.status(403).send({"message": err.message});
    }
}

export async function userProfile(req, res) {
    try {
        const token = req.headers.authorization;
        const getUser : any = await userRepo.userProfile(token.replace("Bearer ",""));

        if(getUser._id) {
            res.status(200).send({"message": "user Profile", "result": getUser});
        }
        else {
            res.status(401).send(getUser);2
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}


export async function updatePhone(req, res) {
    try {
        const token = req.headers.authorization;
        const phone = req.body.phone;
        const updatePhone : any = await userRepo.updatePhone(token.replace("Bearer ",""), phone);

        if(updatePhone.modifiedCount >= 0)  {
            res.status(200).send({"message": "Updated phone number"});
        }
        else {
            res.status(403).send(updatePhone);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}


export async function updateAddress(req, res) {
    try {
        const token = req.headers.authorization;
        const country = req.body.country;
        const state = req.body.state;
        const pincode = req.body.pincode;
        const address = req.body.streetAddress;
    
        const updateAddress : any= await userRepo.updateAddress(token.replace("Bearer ",""), address, pincode, state, country);

        if(updateAddress.modifiedCount >= 0) {
            res.status(200).send({"message": "Updated Address"});
        }
        else {
            res.status(403).send(updateAddress);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}

export async function forgotPassword(req, res) {
    try {
        const email = req.body.email
        const forgotPassword : any = await userRepo.forgotPassword(email)

        if(forgotPassword._id) {
            res.status(200).send({"message": 'OTP Sent to '+email});
        }
        else {
            res.status(401).send(forgotPassword);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}


export async function verifyOTP(req, res) {
    try {
        const email = req.body.email
        const otp = req.body.otp;
        const verify : any = await userRepo.verifyOTP(email, otp)
        console.log(verify);
        if(verify._id) {
            res.status(200).send({"message": 'OTP Verified, you can reset your password now'});
        }
        else {
            res.status(401).send(verify);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}

export async function resetPassword(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password;

        const reset : any = await userRepo.resetPassword(email, password);
        if(reset._id) {
            res.status(200).send({"message": 'Password reset successfully!'});
        }
        else {
            res.status(401).send(reset);
        }
    }
    catch (err) {
        res.status(403).send({"message": err.message});

    }
}