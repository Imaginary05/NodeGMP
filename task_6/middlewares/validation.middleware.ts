import * as Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema, data: any) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
