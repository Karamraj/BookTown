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