const UserSchema = require('../models/userModel');
//const Wallet = require('../models/wallet');
const {throwError} = require("../utils/handleErrors");
const bcrypt = require("bcrypt");
const util = require("../utils/util");
const {validateParameters} = require('../utils/util');

class User {
    constructor(data) {
        this.data = data;
        this.errors = [];
    }

    async emailExist() {
        const existingUser = await UserSchema.findOne({email: this.data.email}).exec();
        if (existingUser) {
            this.errors.push('Email already exists');
            return {emailExist: true, user: existingUser};
        }
        return {emailExist: false};
    }

    async phoneNumberExist() {
        const findPhoneNumber = await UserSchema.findOne({phoneNumber: this.data.phoneNumber}).exec();
        if (findPhoneNumber) {
            this.errors.push('Phone Number already exists');
            return true;
        }
        return false;
    }

    async signup() {
       

        const user = new UserSchema(this.data);
        let validationError = user.validateSync();
        if (validationError) {
            Object.values(validationError.errors).forEach(e => {
                if (e.reason) this.errors.push(e.reason.message);
                else this.errors.push(e.message.replace('Path ', ''));
            });
            throwError(this.errors)
        }
        await Promise.all([this.emailExist(), this.phoneNumberExist()]);
        if (this.errors.length) {
            throwError(this.errors)
        }
        const newUser = await user.save();
        return newUser;
    }

    async login() {
        const {loginId, password} = this.data;
        const validParameters = validateParameters(["loginId", "password"], this.data);
        const {isValid, messages} = validParameters;
        if (!isValid) {
            throwError(messages);
        }
        return await UserSchema.findByCredentials(loginId, password);
    }


    static async getAllUser() {
        const users = await UserSchema.find();
        return users ? users : throwError('No User Found', 404)
    }

    async userProfile() {
        const user = await UserSchema.findById(this.data);
        return user ? user : throwError('User Not Found', 404)
    }

    async updateUserDetails() {
        const {newDetails, oldDetails} = this.data;
        const updates = Object.keys(newDetails);
        const allowedUpdates = [
            'email',
            'phoneNumber',
            'fullName'
        ];
        return await util.performUpdate(updates, newDetails, allowedUpdates, oldDetails);
    }

};

module.exports = User;