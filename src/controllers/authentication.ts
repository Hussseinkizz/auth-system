import { baseUserReturnObject, createUser, getUserByEmail, updateUserById } from '@/db/users.js';
import { createUserValidation, loginValidation } from '@/validation/validation.js';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { body } = req;

        const { success, error, data } = createUserValidation.safeParse(body);

        if (!success) {
            return res.status(400).json({ status: false, log: error });
        }

        const result: typeof baseUserReturnObject | any = await getUserByEmail(data.email);

        if (result && result?.length > 0) {
            return res
                .status(400)
                .json({ status: false, log: 'User already exists, please login instead!' });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await createUser({
            ...data,
            token: '',
            password: hashedPassword,
        });

        return res.status(200).json({ status: true, data: user[0] }).end();
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { body } = req;

        const { success, error, data } = loginValidation.safeParse(body);

        if (!success) {
            return res.status(400).json({ status: false, log: error.issues[0].message });
        }

        const result = await getUserByEmail(data.email);

        if (!result || result.length === 0) {
            return res.status(400).json({ status: false, log: 'User not found!' });
        }

        const user = result[0];

        const isPasswordValid = await verifyPassword(user.password, data.password);

        if (!isPasswordValid) {
            return res.status(403).json({ status: false, log: 'Invalid credentials!' });
        }

        const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        const updatedUser = await updateUserById(user.userId!, {
            ...user,
            token: newToken,
        });

        return res
            .status(200)
            .json({ status: true, data: updatedUser[0], auth: { token: newToken } })
            .end();
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export async function verifyPassword(currentPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, currentPassword);
}
