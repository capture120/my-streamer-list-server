import usersModel from "./users-model.js";

/*
    users-dao.js is called by auth-controller. Unrelated to users.js and users-controller (was a primitive, earlier example)
*/

export const findAllUsers = () =>
    usersModel.find({password:0});

export const findUserById = (id) =>
    usersModel.findById(id, {password:0});

export const findUserByUsername = (username) =>
    usersModel.findOne({ username:username }, {password:0});

export const findUserByCredentials = (username, password) =>
    usersModel.findOne({ username:username, password:password }, {password:0});

export const createUser = (user) =>
    usersModel.create(user);

export const updateUser = (id, user) =>
    usersModel.updateOne({ _id: id }, { $set: user});

export const deleteUser = (id) =>
    usersModel.deleteOne({ _id: id });

/*
export const updatePassword = (id, password) =>
    usersModel.updateOne({ _id: id }, { $set: { password: password } });

export const findUsersWithField = () =>
    usersModel.find({ favoriteChannel: { $exists: true } });
*/