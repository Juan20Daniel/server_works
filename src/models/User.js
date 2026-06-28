const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        profile_image: {
            type: String,
            default: null,
            trim: true,
        },
        firstname: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
            trim: true,
            minlength: 3,
            maxlength: 40
        },
        lastname: {
            type: String,
            required: [true, 'El apellido es obligatorio'],
            trim: true,
            minlength: 3,
            maxlength: 40
        },
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [false, 'La contraseña es obligatoria'],
            minlength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        provider_id: {
            type: String,
            default: null,
            trim: true,
        },
        provider: {
            type: String,
            enum: ['google'],
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);