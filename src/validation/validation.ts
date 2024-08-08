import * as z from 'zod';
import validator from 'validator';

const phone_number_validator = z
    .string()
    .refine(
        phone => (phone && phone !== '' ? validator.isMobilePhone(phone, 'any') : true),
        'Invalid Phone Number!',
    );

const email_validator = z
    .string()
    .refine(email => (email ? validator.isEmail(email) : true), 'Invalid Email');

const string_value_validator = (minLength: number, key: string) =>
    z.string().min(minLength, `Invalid ${key}!`);

export const createUserValidation = z.object({
    username: string_value_validator(3, 'username'),
    email: email_validator,
    password: string_value_validator(4, 'password'),
    other: z.object({}).optional(),
});

export const userValidation = z.object({
    username: string_value_validator(3, 'username'),
    email: email_validator,
    password: string_value_validator(4, 'password'),
    isActive: z.boolean().optional(),
    other: z.object({}).optional(),
});

export const loginValidation = z.object({
    email: email_validator,
    password: string_value_validator(4, 'password'),
});

export const validate = ({
    validator,
    value,
    onSuccess,
    onInvalid,
}: {
    validator: any;
    value: string;
    onSuccess: (v: any) => void;
    onInvalid: (e: any) => void;
}) => {
    const result = validator.safeParse(value);

    if (result.success) {
        let validData = result.data;
        onSuccess(validData);
    } else {
        const message = result.error.errors[0].message;
        onInvalid(message);
    }
};
