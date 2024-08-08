import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export const authentication = (salt: string, password: string): string => {
    return crypto
        .createHmac('sha256', [salt, password].join('-'))
        .update(process.env.SECRET!)
        .digest('hex');
};

export const random = () => crypto.randomBytes(128).toString('base64');

// Function to add hours to a timestamp and return the updated timestamp in milliseconds
export const addTimeToTimeStamp = (timestamp: number, hours: number): number => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + hours);
    return date.getTime();
};

// Function to check if a given timestamp is in the past compared to the current time
export const isPastTimestamp = (timestamp: number | Date | null): boolean => {
    if (timestamp === null) return true;
    if (timestamp instanceof Date) return timestamp.getTime() < Date.now();
    return timestamp < Date.now();
};

export const useUpload = ({
    directory,
    maxFileSize = 5,
}: {
    directory: string;
    maxFileSize?: number;
}) => {
    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `data/${directory}`); // upload directory
            },
            filename: (req, file, cb) => {
                const randomName = crypto.randomBytes(16).toString('hex');
                cb(null, `${randomName}${path.extname(file.originalname)}`);
            },
        }),
        limits: {
            fileSize: maxFileSize * 1024 * 1024, // file size limit
        },
    });

    return upload;
};
