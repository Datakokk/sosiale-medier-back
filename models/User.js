const { model, Schema } = require('mongoose');

const { ObjectId } = Schema;

const UserSchema = Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        text: true,
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        text: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        text: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    picture: {
        type: String,
        trim: true,
        default: "http://res.cloudinary.com/dmgcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
    },
    cover: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true,
    },
    bDay: {
        type: Number,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    requests: {
        type: Array,
        default: []
    },
    search: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
            },
        },
    ],
    details: {
        bio: {
            type: String,
        },
        otherName: {
            type: String,
        },
        job: {
            type: String,
        },
        workplace: {
            type: String,
        },
        highSchool: {
            type: String,
        },
        college: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        hometown: {
            type: String,
        },
        relationship: {
            type: String,
            enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
        },
        instagram: {
            type: String,
        },
    },
    savePost: [
        {
            post: {
                type: ObjectId,
                ref: 'Post'
            },
            savedAt: {
                type: Date,
                default: new Date(),
            },
        },
    ],
},
{
    timestamps: true,
}
);

module.exports = model('User', UserSchema );