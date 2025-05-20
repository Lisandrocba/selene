import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import { createToken } from '../services/auth.js';
export const signup = async (req, res) => {
    const { password, username, email } = req.body;
    const user = await Users.findOne({ username });
    if (user)
        return res.status(400).send({ status: 'error', error: 'El usuario ya se encuentra registrado' });
    const passEncript = await bcrypt.hash(password, 10);
    try {
        const newUser = new Users({ username, email, password: passEncript });
        await newUser.save();
        const idNewUser = newUser._id;
        res.send({ status: 'success', idNewUser, message: 'Usuario creado con exito' });
    }
    catch (error) {
        res.status(500).send({ status: 'error', error: 'Error al cargar el usuario', err: error });
    }
};
export const login = async (req, res) => {
    const { password, username } = req.body;
    const userExist = await Users.findOne({ username });
    if (!userExist)
        return res.status(400).send({ status: 'error', error: 'El usuario no existe' });
    try {
        bcrypt.compare(password, userExist.password, (err, resp) => {
            if (err) {
                return res.status(403).send({ status: 'error', error: 'El usuario no existe' });
            }
            if (resp) {
                const { _id, username } = userExist;
                const token = createToken({ _id, username });
                res.send({ status: 'success', token, username, _id, message: 'Usuario validado con exito' });
            }
            else {
                return res.status(401).send({ status: 'error', message: 'Usuario o contraseña invalido' });
            }
        });
    }
    catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error al validar los datos', err: error });
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        if (!users)
            return res.status(400).send({ status: 'error', error: 'No se encontraron usuarios' });
        res.send({ status: 'success', users, message: 'Lista de usuarios' });
    }
    catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error al buscar los usuarios', err: error });
    }
};
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Users.findById(id);
        if (!usuario)
            return res.status(400).send({ status: 'error', error: 'No se pudo encoentrar el usuario' });
        res.send({ status: 'success', usuario, message: 'Usuario encontrado' });
    }
    catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error al buscar el usuario', err: error });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const objUser = req.body;
        const usuario = await Users.findById(id);
        if (!usuario)
            return res.status(400).send({ status: 'error', error: 'No se pudo encoentrar el usuario' });
        if (objUser.password)
            return res.status(400).send({ status: 'error', error: 'No se pudo modificar contaseña' });
        const userUpdate = await Users.findByIdAndUpdate({ _id: id }, objUser, { new: true });
        res.status(200).send({ status: 'success', userUpdate, message: 'Usuario modificado' });
    }
    catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error al buscar el usuario', err: error });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Users.findById(id);
        if (!usuario)
            res.status(400).send({ status: 'error', error: 'No se pudo encoentrar el usuario' });
        await Users.findByIdAndDelete(id);
        res.send({ status: 'success', message: 'usuario eliminado con exito' });
    }
    catch (error) {
        return res.status(500).send({ status: 'error', error: 'Error al eliminar el usuario', err: error });
    }
};
