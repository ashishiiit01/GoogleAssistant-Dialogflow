/**
*
 *** @author     : Anupam Saha
 *
 *** @date       : 15-04-2019 
 *
 *** @Description: User schema in DB
 * 
 **/
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleUserId: String,
    email: String,
    userName: String,
    context: String,
    income: Number,
    otherIncome: Number,
}, { timestamps: true })
const user = mongoose.model('user', userSchema);

module.exports = user;