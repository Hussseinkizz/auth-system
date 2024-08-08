import { SESSION_TOKEN } from '@/constants/index.js';
import { getUserBySessionToken } from '@/db/users.js';
import express from 'express';

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        // const sessionToken = req.cookies[SESSION_TOKEN];

        // Extract token from Authorization header (if present)
        let sessionToken;
        if (req.headers?.authorization && req.headers?.authorization.startsWith('Bearer ')) {
            sessionToken = req.headers?.authorization.split(' ')[1];
        }

        // console.log('log::', sessionToken);

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const result = await getUserBySessionToken(sessionToken);

        if (!result || result.length === 0) {
            return res.status(403).json({
                status: false,
                log: 'User not authenticated, please login and try again!',
            });
        }

        return next();
    } catch (e) {
        console.log(e);
        return res
            .status(400)
            .json({ status: false, log: 'An error occurred during authentication.' });
    }
};
