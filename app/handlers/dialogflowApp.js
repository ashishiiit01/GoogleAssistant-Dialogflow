const Config = require('../../config/index')
const UserCtrl = require('../database/controllers/user')
const Auth = require('./auth')
const ErrorHandler = require('../lib/error')
const IntentHandler = require('./intent')
const Response = require('../lib/response')
const { dialogflow, BasicCard, SignIn, Confirmation, Suggestions, LinkOutSuggestion } = require("actions-on-google");


// Instantiate the Dialogflow client.
const app = dialogflow({ clientId: Config.aud });


// Handlers go here..
app.intent("Start Signin Intent", conv => { 
	console.log('Triggered Start Signin Intent')
	conv.ask(new SignIn());

});

app.intent('Get Signin Intent', async (conv, params, signin) => {
	console.log('Triggered Get Signin Intent')
  let isAuthenticated = await Auth.checkAuthentication(conv.user.profile.payload)
  
  if (signin.status === 'OK' && isAuthenticated) {
    let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
  	if(userData==undefined || userData==null)
  		userData = await UserCtrl.createUser({ googleUserId: conv.user.raw.userId, email: conv.user.profile.payload.email})

    userData = await UserCtrl.updateUser({ _id: userData._id, data: {context: 'signIn'} })
    userData = await UserCtrl.resetUserFields(userData._id)
    
    messages = await IntentHandler.handlers(conv, 'signIn')
    sendMessageToUser(conv, messages)
  
  }

});

app.intent("Default Welcome Intent", async (conv, params, signin) => { 
  let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
    if(userData==undefined || userData==null)
      conv.ask(new SignIn());
    else {
      userData = await UserCtrl.updateUser({ _id: userData._id, data: {context: 'signIn'} })
      userData = await UserCtrl.resetUserFields(userData._id)
      messages = await IntentHandler.handlers(conv, userData.context)
      sendMessageToUser(conv, messages)
  }

});

app.intent("Asks Mortgage Value Intent", async (conv, params, signin) => { 
	let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
  	if(userData==undefined || userData==null)
    	conv.ask(new SignIn());
    else {
      messages = await IntentHandler.handlers(conv, 'welcome')
      if(!messages)
        conv.close(await Response.closeConvo(conv))
      else
        sendMessageToUser(conv, messages)
  }
});


app.intent("Another Enquiry Intent", async (conv, params, signin) => { 
  console.log('Another Enquiry Intent')
  let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
    if(userData==undefined || userData==null)
      conv.ask(new SignIn());
    else {
      messages = await IntentHandler.handlers(conv, 'welcome')
      if(!messages)
        conv.close(await Response.closeConvo(conv))
      else
        conv.ask(new Confirmation(messages)) 
  }
});

app.intent("Income Intent", async (conv, params, signin) => { 
  let context = 'nill' 
  let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
    if(userData==undefined || userData==null)
      conv.ask(new SignIn());
    else {
      if(userData.income==undefined && userData.context=='askMortgage')
        context = 'askMortgage'
      else if(userData.otherIncome==undefined && userData.context=='otherIncome')
        context = 'otherIncome'
     
      messages = await IntentHandler.handlers(conv, context, params)
      if(!messages)
        conv.close(await Response.closeConvo(conv))

      else if(context=='nill')
        sendMessageToUser(conv, messages)
      else
        conv.ask(new Confirmation(messages)) 
      
     
    }
});

app.intent("Confirmation Intent", async (conv, params, confirmationGranted) => { 
  let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
    if(userData==undefined || userData==null)
      conv.ask(new SignIn());
    else {
      messages = await IntentHandler.handlers(conv, userData.context, confirmationGranted)
      if(userData.context == 'sendLink')
        conv.close(messages)
      else if((userData.context == 'income' && confirmationGranted) || userData.context == 'confirmIncome' || userData.context == 'anotherEnquiry' )
        sendMessageToUser(conv, messages)
      else 
        conv.ask(new Confirmation(messages)) 
      
    }

});

app.intent("Default Fallback Intent", async (conv, params, signin) => { 
  let userData = await UserCtrl.findByGoogleUserId(conv.user.raw.userId)
    if(userData==undefined || userData==null)
      conv.ask(new SignIn());
    else {
      var messages = await ErrorHandler.noMatchHandle(conv, userData.context)
      if(!messages)
        conv.close(await Response.closeConvo(conv))
      else
        sendMessageToUser(conv, messages)
      }

});



function sendMessageToUser(conv, texts) {
  for(let message of texts)
    conv.ask(message)

}


function sendConfirmationToUser(conv, text) {
    conv.ask(new Confirmation(text))
} 

module.exports = app;
