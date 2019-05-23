const Response = require('../lib/response')
const UserCtrl = require('../database/controllers/user')

exports.handle = async (conv, context, params) => {

	let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
	if (context == 'signIn') {
    	messages = await Response['welcome'](conv)
        userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'welcome' } })

    }
    else if (context == 'welcome') { 
        if(conv.intent == "Asks Mortgage Value Intent") {
        	messages = await Response['askMortgage'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'askMortgage' } })
        
        } else {
            messages = await Response['anotherEnquiry'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'anotherEnquiry' } })
        }

    } else if(context == 'askMortgage') {
        if(params.income<=10) {
            messages = await Response['confirmIncome'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'confirmIncome' } })
        }
        else {
        	messages = await Response['income'](conv, params)
        	userData = await UserCtrl.updateUser({ _id: userData._id, data: { income: params.income, context: 'income' } })
        }

    } else if(context == 'anotherEnquiry') {
        if(params) {
            messages = await Response['askMortgage'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'askMortgage' } })
        }
        else {
            messages = await Response['startAgain'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'welcome' } })
        }

    } else if(context == 'confirmIncome') {
        if(params) {
            messages = await Response['askIncome'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'askMortgage' } })
        }
        else {
            messages = await Response['startAgain'](conv)
            userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'welcome' } })
        }

    } else if(context == 'income') {
    	if(params) {
    		messages = await Response['otherIncome'](conv)
    		userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'otherIncome' } })
    	
    	} else {
    		messages = await Response['estimate'](conv)
    		userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'estimate' } })
    	}

    } else if(context == 'otherIncome') {
    		messages = await Response['estimate'](conv)
    		userData = await UserCtrl.updateUser({ _id: userData._id, data: { otherIncome: params.income, context: 'estimate' } })
    	 	
    } else if(context == 'estimate') {
    	if(params) {
    		messages = await Response['estimate'](conv)
    		userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'estimate' } })
    	
    	} else {
    		messages = await Response['sendLink'](conv)
    		userData = await UserCtrl.updateUser({ _id: userData._id, data: { context: 'sendLink' } })
    	}
    
    } else if(context == 'sendLink') {
    	messages = await Response['endConvo'](conv)

    } 

    return messages
}