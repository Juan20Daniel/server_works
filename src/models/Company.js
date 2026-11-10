const mongoose = require('mongoose');
const getInitials = require('../utils/initials');
const getColorIndex = require('../utils/colorIndex');
const { PALETTE_SIZE } = require('../constants');

const logoSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            trim: true,
            default: null
        },
        fallback: {
            initials: {
                type: String,
                uppercase: true,
                trim: true,
                maxLength: 2,
                require: true
            },
            colorIndex: {
                type: Number,
                min: 0,
                max: PALETTE_SIZE - 1,
                default: 0
            }
        }
    },
    {
        _id:false
    }
)

const companySchema = new mongoose.Schema(
    {
        logo: {
            type: logoSchema,
            default: () => ({})
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

companySchema.pre("validate", async function () {
    if (this.isNew || this.isModified("name")) {
        this.logo.fallback.initials = getInitials(this.name);
        this.logo.fallback.colorIndex = getColorIndex(this.name);
    }
});

module.exports = mongoose.model('Company', companySchema);