const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    notifications:[ 
        {
          type: {
            type: String,
            required: true
          },
          author: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date
          },
        }
    ],
    activities:[ 
        {
          type: {
            type: String,
            required: true
          },
          interactedWith: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date
          },
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema)