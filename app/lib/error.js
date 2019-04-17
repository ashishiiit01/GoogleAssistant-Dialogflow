const Collection = require('./collection')


noMatch_welcome = [
"One more time, what can I do for you?", 
"I didn’t catch that. Can you be please more specific?"
]

noMatch_askMortgage = [
"What’s your gross yearly income, if I may ask?", 
"Can you give me an estimate of what you earn on a yearly basis?"
]


exports.noMatchHandle = async (conv, context) => {
	if(conv.data.fallbackCount>1) {
		return 0
	
	} else {
		if(context == 'welcome') 
			return [noMatch_welcome[conv.data.fallbackCount++]]
		
		else if(context == 'askMortgage')
			return [noMatch_askMortgage[conv.data.fallbackCount++]] 
	}

}
