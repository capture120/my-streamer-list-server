import * as usersDao from '../users/users-dao.js';
import mongoose from "mongoose";


const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:id', findUserById);
    
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    
    app.put("/api/users/:id", update);
    app.put("/api/users/current_user/:id", updateCurrentUser)
    /*
    app.delete('/api/users/:id', deleteUser);
    */
}

const findUserById = async (req, res) => {
    const id = req.params.id;

    if (mongoose.Types.ObjectId.isValid(id)) {
        const user = await usersDao.findUserById(id);
        res.json(user);
    } else {
        res.sendStatus(404);
    }

}

const findUsers = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
}


// AUTHENTICATION

const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
        res.sendStatus(409);
        return;
    }
    const newUser = await usersDao.createUser({...req.body, email:"", favoriteChannel: null, isAdmin: false});
    req.session["currentUser"] = newUser;
    res.json(newUser);
};

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
            return;
        }
    }
    res.sendStatus(403);
};

const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    res.json(currentUser);
};

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

const update = async (req, res) => {
    const user_id = req.params["id"];
    const updated_user = req.body;
    /* check to see if the user exists in the database */
    const user_in_db = await usersDao.findUserById(user_id);

    if (user_in_db) {
        await usersDao.updateUser(user_id, updated_user);
        res.json(updated_user);
        return;
    }
    res.sendStatus(404);
};

// const updateCurrentUser = async (req, res) => {
//     const updated_user = await update(req, res);
//     console.log(JSON.stringify(updated_user));
//     if (updated_user) {
//         req.session["currentUser"] = updated_user;
//     }
// }

const updateCurrentUser = async (req, res) => {
    const user_id = req.params["id"];
    const updated_user = req.body;
    /* check to see if the user exists in the database */
    const user_in_db = await usersDao.findUserById(user_id);

    if (user_in_db) {
        await usersDao.updateUser(user_id, updated_user);
        req.session["currentUser"] = updated_user;
        res.json(updated_user);
        return;
    }
    res.sendStatus(404);
};


// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     const status = await usersDao.deleteUser(id);
//     res.json(status);
// }



export default UserController;