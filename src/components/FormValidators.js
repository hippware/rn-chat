import validatorjs from 'validator';

export default {
    handle: {
        title: 'Username',
        validate: [
            {
                validator: 'isLength',
                arguments: [3, 16],
                message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters',
            },
            {
                validator: 'matches',
                arguments: /^[a-zA-Z0-9_]*$/,
                message: '{TITLE} can contains only alphanumeric characters',
            },
        ],
    },
    firstName: {
        title: 'First Name',
        validate: [
            {
                validator: 'matches',
                arguments: /^[\u00BF-\u1FFF\u2C00-\uD7FF\w ]*$/i,
                message: '{TITLE} is invalid',
            },
        ],
    },
    lastName: {
        title: 'Last Name',
        validate: [
            {
                validator: 'matches',
                arguments: /^[\u00BF-\u1FFF\u2C00-\uD7FF\w ]*$/i,
                message: '{TITLE} is invalid',
            },
        ],
    },
    email: {
        title: 'Email',
        validate: [
            {
                validator: (...args) => {
                    if (!args[0] || validatorjs.isEmail(args[0]) === true) {
                        return true;
                    }
                    return false;
                },
                message: '{TITLE} is not valid',
            },
        ],
    },
};
