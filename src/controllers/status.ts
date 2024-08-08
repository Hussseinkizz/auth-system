import express from 'express';

export const checkStatus = async (req: express.Request, res: express.Response) => {
    return res.status(200).json({ status: true, data: 'server is running well 😎' }).end();
};
