import mongoose, {Schema} from 'mongoose';
import {hashSync, compareSync} from 'bcryptjs';
import jwt from 'jsonwebtoken';

import constants from '../../configs/constants';

const UserSchema = new Schema({
     email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }

    return next();
});

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    comparePassword(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            constants.JWT_SECRET,
        );
    },
    toJSON() {
        return {
            _id: this._id,
            token: `JWT ${this.createToken()}`,
        };
    },
};

export default mongoose.model('User', UserSchema);