import { getUserById, getUsers, updateUserById } from '@/db/users.js';
import { userValidation } from '@/validation/validation.js';
import express from 'express';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json({ status: true, data: users });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const getUserProfile = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ status: false, log: 'userId is required in url' });
        }

        const user: any = await getUserById(userId);

        return res.status(200).json({
            status: true,
            data: {
                user,
            },
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.userId;
        const { body } = req;
        // console.log(body);

        const { success, error, data } = userValidation.safeParse(body);

        if (!success) {
            return res.status(400).json({ status: false, log: error });
        }

        // let user = await getUserById(userId);

        let newUser = {
            username: data.username,
            password: data.password,
            email: data.email,
            isActive: data.isActive ?? false,
            other: data.other,
            token: '',
        };

        const updatedUser = await updateUserById(userId, newUser);

        return res.status(200).json({ status: true, data: updatedUser });
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
