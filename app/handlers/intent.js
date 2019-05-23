const UserCtrl = require('../database/controllers/user')
const ErrorHandler = require('../lib/error')
const Context = require('./context')


exports.handlers = async (conv, context, params=null) => {
	let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
	if(context == userData.context) {
		conv.data.fallbackCount = 0
		var messages = await Context.handle(conv, context, params)
	
	} else {
		var messages = await ErrorHandler.noMatchHandle(conv, userData.context)
	}

	return messages  
}