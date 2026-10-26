const mongoose = require('mongoose');
const { id } = require('zod/locales');

const companySchema = new mongoose.Schema(
    {
        logo: {
            type: String,
            trim: true,
            default: null
        },
        name: {
            type: String,
            trim: true,
            require: [true, 'El nombre es requerido'],
            minLength: 1,
            maxLength: 50
        },
        desc: {
            type: String,
            trim: true,
            require: [true, 'La descripción es requerida'],
            minLength: 1,
            maxLength: 200
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            require: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Company', companySchema);