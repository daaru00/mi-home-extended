// Import the appropriate service and chosen wrappers
const {
    dialogflow,
} = require('actions-on-google')

// Create an app instance
const app = dialogflow()
const miHome = require('./mi-home')
miHome.load()

// Register handlers for Dialogflow intents

app.intent('Default Welcome Intent', conv => {
    conv.ask('Hi, there are '+Object.keys(miHome.devices).length+' connected devices, what you want to do?')
})

// Intent in Dialogflow called `Goodbye`
app.intent('Goodbye', conv => {
    conv.close('See you later!')
})

app.intent('Default Fallback Intent', conv => {
    conv.ask(`I didn't understand. Can you repeat plase?`)
})
