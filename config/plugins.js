module.exports = ({env}) => ({
    "users-permissions": {
        config: {
            register: {
                allowedFields: ["type", "contact", "location", "skills", "experience"],
            }
        }
    },
    upload: {
        config: {
            provider: 'cloudinary',
            providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            },
            actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
            },
        }
    }
});
