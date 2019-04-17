/**
*
 *** @author     : Anupam Saha
 *
 *** @date       : 15-04-2019 
 *
 *** @Description: Handle all the user actions.
 * 
 **/
const User = require('../models/user')


exports.createUser = (data) => {
    return new Promise((resolve, reject) => {
        var _user = new User(data);
        _user.save(function (err, user) {
            if (err) {              
                reject(err);
            }
            resolve(user);
        });
    })
}

exports.findByGoogleUserId = (userId) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            googleUserId: userId
        }, (err, user) => {
            if (err) {              
                reject(err);
            }
            resolve(user)
        });
    })
}

exports.updateUser = (_user) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(_user._id, {
            $set: _user.data
        }, {
            new: true
        }, (err, user) => {
            if (err) {            
                reject(err);
            }
            resolve(user)
        });
    })
}


exports.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) {              
                reject(err);
            }
            resolve(user)
        });
    })
}



exports.deleteUserData = (userid) => {
    return new Promise((resolve, reject) => {
        data = {         
            email: '', name: '', address: '', postalcode: '', city: '',iban: ''
        }
        User.findOneAndUpdate({ '_id': userid }, { $unset: data }, { multi: false }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}



exports.deleteUser = (userid) => {
    return new Promise((resolve, reject) => {
        User.remove({ '_id': userid }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


exports.resetUserFields = (userid) => {
    return new Promise((resolve, reject) => {
        data = {
            income: '',
            otherIncome: ''
        }
        User.findOneAndUpdate({ '_id': userid }, { $unset: data }, { multi: false }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}




