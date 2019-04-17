exports.welcome = async (conv) => {
     return [
       `Hi ${conv.user.profile.payload.name}. I got your account details. How can I help you?`
    ]
}

exports.startAgain = async () => {
	return [
		`Alright, let’s start over. How can I help you?`
	]
}

exports.askMortgage = async (conv) => {
	return [
       `Alright. Based on your yearly income I can give you an estimate. Additionally, I’ll calculate your gross and net monthly costs.`,
       `So, what’s your gross yearly income?`
    ]
}

exports.anotherEnquiry = async (conv) => {
	return `Do you want me to calculate your maximum mortgage ?`
}

exports.income = async (conv, params) => {
	return `${params.income}. Do you want to include the income of someone else?`

}

exports.confirmIncome = async () => {
	return `To make an estimation, the gross yearly income must be at least 10,000 euro. Do you want to try again?`
}

exports.askIncome = async () => {
	return ['Alright, what’s your gross yearly income?']
}

exports.otherIncome = async (conv) => {
	return [
       `OK, how much is this gross yearly income?`
    ]
}

exports.estimate = async (conv) =>{
	return `Got it. My estimate is that with an interest rate of 20%, and a running time of 15 years, your maximum mortgage will be 340.900 euro. That means you will pay 1808 euro gross and 1015 net per month. Do you want me to repeat that?`
}

exports.sendLink = async (conv) =>{
	return `On our website you’ll find a calculator that gives you a more detailed estimate. I’ll send you a link to your phone. Anything else I can do for you?`
    
}

exports.endConvo = async (conv) => {
	return  'Alright. See you next time.' 
}

exports.closeConvo = async (conv) => {
	return 'Sorry, I’m still not understanding it, maybe this is not the right time. See you later.'
}