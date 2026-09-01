const mongoose = require('mongoose');

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
            maxLength: 50
        },
        desc: {
            type: String,
            trim: true,
            require: [true, 'La descripción es requerida'],
            minLength: 10,
            maxLength: 200
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            require: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Company', companySchema);