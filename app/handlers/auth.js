const Config = require('../../config/index')
const UserCtrl = require('../database/controllers/user')


exports.checkAuthentication = async (payload) => {
	if(payload.iss == Config.iss && payload.aud == Config.aud)
		return true
	else
		return false
}